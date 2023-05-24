export enum Permissions {
  NONE = 0,

  // UNSAFE_PERMISSIONS
  ADMINISTRATOR = 1 << 0,

  // SAFE PERMISSIONS
  VIEWER = 1 << 1,
}

export class Permission {
  private _permissions: number

  constructor(_permissions: number) {
    this._permissions = _permissions.valueOf()
  }

  public valueOf(): number {
    return this._permissions
  }

  public toString() {
    return this._permissions.toString()
  }

  get permissions() {
    return this._permissions
  }

  public static combine = (permissions: Permissions[]) => {
    let permission = 0

    for (const flag of permissions) {
      permission = permission | flag
    }

    return permission
  }

  public readonly not = {
    has: (...permissions: Permissions[]) => {
      return !this.has(...permissions)
    },
  }

  public static add = (permissions: number, perms: Permissions[]) => {
    return permissions | Permission.combine(perms)
  }

  public static remove = (permissions: number, perms: Permissions[]) => {
    return permissions & ~Permission.combine(perms)
  }

  public readonly has = (...permissions: Permissions[]) => {
    return !!(
      this._permissions &
      (Permissions.ADMINISTRATOR | Permission.combine(permissions))
    )
  }

  public readonly add = (...permissions: Permissions[]) => {
    this._permissions = Permission.add(this._permissions, permissions)
    return this._permissions
  }

  public readonly remove = (...permissions: Permissions[]) => {
    this._permissions = Permission.remove(this._permissions, permissions)
    return this._permissions
  }
}
