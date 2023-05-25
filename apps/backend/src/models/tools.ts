import type { ColumnCommonOptions } from 'typeorm/decorator/options/ColumnCommonOptions'
import { Field } from '@nestjs/graphql'
import { PrimaryColumn } from 'typeorm'

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

export const Snowflake = () => {
  const field = Field(() => String)
  const column = PrimaryColumn('varchar')

  return (target: any, propertyKey: string) => {
    field(target, propertyKey)
    column(target, propertyKey)
  }
}
