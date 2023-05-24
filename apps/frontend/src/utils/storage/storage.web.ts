import { StorageInterface } from 'src/utils/storage/abstract'

export class WebStorage extends StorageInterface {
  static async get(filePath: string): Promise<string | null | undefined> {
    return localStorage.getItem(`file:${filePath}`)
  }

  static async set(filePath: string, data: string): Promise<void> {
    localStorage.setItem(`file:${filePath}`, data)
  }
}
