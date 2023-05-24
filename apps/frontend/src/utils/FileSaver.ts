export interface FileSaverOptions {
  accept: string[]
  multiple: boolean
}

export const defaultOptions = {
  accept: ['.pxcl'],
  multiple: false,
}

export class FileSaver {
  private saver: HTMLAnchorElement

  constructor(private options: FileSaverOptions = defaultOptions) {
    this.saver = document.createElement('a')
  }

  trigger(name: string, contents: string) {
    this.saver.setAttribute('download', `${name}.pxcl`)
    this.saver.setAttribute('href', URL.createObjectURL(new Blob([contents])))
    this.saver.click()
  }
}
