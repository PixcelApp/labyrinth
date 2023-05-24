import { Buffer } from 'buffer'

export class GenericFile<TData> {
  constructor(
    private _serializer: (data: TData) => string,
    private _deserializer: (data: string) => TData,
  ) {}

  toBinary(data: TData) {
    return Buffer.from(
      Buffer.from(this._serializer(data), 'utf8').toString('hex'),
      'hex',
    ).toString('binary')
  }

  toBinaryArrayBuffer(data: TData) {
    return Buffer.from(this.toBinary(data)).buffer
  }

  fromBinary(contents: string): TData {
    return this._deserializer(
      Buffer.from(
        Buffer.from(contents, 'binary').toString('hex'),
        'hex',
      ).toString('utf8'),
    )
  }
}
