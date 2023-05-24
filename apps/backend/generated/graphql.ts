
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export abstract class IMutation {
    abstract createUser(username: string): UserModel | Promise<UserModel>;
}

export abstract class IQuery {
    abstract user(id: string): Nullable<UserModel> | Promise<Nullable<UserModel>>;
}

export class UserModel {
    id: string;
    nickname: string;
    type: number;
    username: string;
}

type Nullable<T> = T | null;
