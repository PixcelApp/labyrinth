export abstract class StorageInterface {
  protected static get(filePath: string): Promise<string | null | undefined> {
    throw new Error('not implemented')
  }

  protected static set(filePath: string, data: string): Promise<void> {
    throw new Error('not implemented')
  }
}
