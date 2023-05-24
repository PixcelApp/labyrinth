import { TauriStorage } from 'src/utils/storage/storage.tauri'
import { StorageInterface } from 'src/utils/storage/abstract'
import { WebStorage } from 'src/utils/storage/storage.web'
import { isTauri } from 'src/utils/tauri'
import { GenericFile } from 'src/utils/GenericFile'

export class Storage extends StorageInterface {
  static get(filePath: string): Promise<string | null | undefined> {
    if (isTauri()) {
      return TauriStorage.get(filePath)
    } else {
      return WebStorage.get(filePath)
    }
  }

  static set(filePath: string, data: string): Promise<void> {
    if (isTauri()) {
      return TauriStorage.set(filePath, data)
    } else {
      return WebStorage.set(filePath, data)
    }
  }
}

export class JsonStorage extends Storage {
  private static parser = new GenericFile(
    (data: any) => JSON.stringify(data),
    (data: string) => JSON.parse(data),
  )

  static async get<T>(filePath: string): Promise<T | null> {
    const data = await super.get(filePath + ".json")
    if (data) {
      return this.parser.fromBinary(data)
    } else {
      return null
    }
  }

  static async set<T>(filePath: string, data: T): Promise<void> {
    return super.set(filePath + ".json", this.parser.toBinary(data))
  }
}
