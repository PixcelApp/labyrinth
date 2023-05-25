export declare enum Permissions {
    NONE = 0,
    ADMINISTRATOR = 1,
    VIEWER = 2
}
export declare class Permission {
    private _permissions;
    constructor(_permissions: number);
    valueOf(): number;
    toString(): string;
    get permissions(): number;
    static combine: (permissions: Permissions[]) => number;
    readonly not: {
        has: (...permissions: Permissions[]) => boolean;
    };
    static add: (permissions: number, perms: Permissions[]) => number;
    static remove: (permissions: number, perms: Permissions[]) => number;
    readonly has: (...permissions: Permissions[]) => boolean;
    readonly add: (...permissions: Permissions[]) => number;
    readonly remove: (...permissions: Permissions[]) => number;
}
