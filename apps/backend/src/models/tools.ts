import { ColumnCommonOptions } from 'typeorm/decorator/options/ColumnCommonOptions'

export class Options {
  #options: ColumnCommonOptions = {}

  get nullable() {
    this.#options.nullable = true
    return this
  }

  get unique() {
    this.#options.unique = true
    return this
  }

  get primary() {
    this.#options.primary = true
    return this
  }

  get select() {
    this.#options.select = true
    return this
  }

  get default() {
    this.#options.default = true
    return this
  }

  get array() {
    this.#options.array = true
    return this
  }

  setName(name: string) {
    this.#options.name = name
    return this
  }

  setComment(comment: string) {
    this.#options.comment = comment
    return this
  }

  get get() {
    return this.#options
  }

  static unique = new Options().unique.get
  static nullable = new Options().nullable.get
}
