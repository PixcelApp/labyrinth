export type Color = Hex | RGB

export type RGBString =
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | `rgba(${number},${number},${number},${number})`
export type HexString = `#${string}`

export class Hex {
  constructor(public hex: HexString) {}

  toString() {
    return this.hex
  }

  toJSON() {
    return this.hex
  }

  toRgb() {
    const [r, g, b] = this.hex
      .replace('#', '')
      .match(/.{1,2}/g)
      ?.map((hex) => parseInt(hex, 16)) ?? [0, 0, 0]

    return new RGB(r, g, b)
  }

  static fromJSON(str: HexString) {
    return new Hex(str)
  }

  static fromRgb(rgb: RGB) {
    return rgb.toHex()
  }

  static fromString(str: HexString) {
    return new Hex(str)
  }
}

export class RGB {
  constructor(
    public r: number,
    public g: number,
    public b: number,
    public a: number = 1,
  ) {}

  toString(): RGBString {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
  }

  toJSON() {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a,
    }
  }

  toHex() {
    const hex = [this.r, this.g, this.b]
      .map((c) => c.toString(16).padStart(2, '0'))
      .join('')

    return new Hex(`#${hex}`)
  }

  static fromJSON(obj: { r: number; g: number; b: number; a: number }) {
    return new RGB(obj.r, obj.g, obj.b, obj.a)
  }

  static fromHex(hex: Hex) {
    return hex.toRgb()
  }

  static fromString(str: RGBString) {
    const [r, g, b, a] = str
      .replace('rgba(', '')
      .replace(')', '')
      .split(',')
      .map((s) => parseInt(s.trim()))

    return new RGB(r, g, b, a)
  }
}
