export interface FileOpenerOptions {
  accept: string[]
  multiple: boolean
}

export const defaultOptions = {
  accept: ['.pxcl'],
  multiple: false,
}

export class FileOpener {
  private opener: HTMLInputElement

  constructor(private options: FileOpenerOptions = defaultOptions) {
    this.opener = document.createElement('input')
    this.opener.setAttribute('type', 'file')
    this.opener.setAttribute('accept', options.accept.join(','))
    this.opener.setAttribute('multiple', options.multiple.toString())
  }

  trigger() {
    return new Promise<FileList>((resolve, reject) => {
      this.opener.onchange = (e) => {
        const files = (e.target as HTMLInputElement).files
        if (files) {
          resolve(files)
        } else {
          reject()
        }
      }
      this.opener.click()
    })
  }
}
