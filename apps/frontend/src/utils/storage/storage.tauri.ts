import { fs } from '@tauri-apps/api'
import { StorageInterface } from 'src/utils/storage/abstract'
import { appLocalDataDir } from '@tauri-apps/api/path'

export class TauriStorage extends StorageInterface {
  private static _appDataDirPath: string

  private static async createDefault(filePath: string) {
    await this.checkAppDataDir()

    if (await fs.exists(`${this._appDataDirPath}/${filePath}`)) {
      return
    }

    await fs.writeFile(`${this._appDataDirPath}/${filePath}`, "")
  }

  private static async checkAppDataDir(tries = 1) {

    if (tries && tries > 2) {
      throw new Error('Could not create app data dir')
    }


    if (this._appDataDirPath) {
      return
    }

    this._appDataDirPath = await appLocalDataDir()

    if (!(await fs.exists(this._appDataDirPath))) {
      await fs.createDir(this._appDataDirPath)
      await this.checkAppDataDir(tries + 1)
    }
  }

  static async get(filePath: string): Promise<string> {
    await this.checkAppDataDir()

    try {
      return await fs.readTextFile(`${this._appDataDirPath}/${filePath}`)
    } catch (error) {
      await this.createDefault(filePath)
      return await TauriStorage.get(filePath)
    }
  }

  static async set(filePath: string, data: string): Promise<void> {
    await this.checkAppDataDir()

    try {
      await fs.writeTextFile(`${this._appDataDirPath}/${filePath}`, data)
    } catch (error) {
      await this.createDefault(filePath)
      await TauriStorage.set(filePath, data)
    }
  }
}
