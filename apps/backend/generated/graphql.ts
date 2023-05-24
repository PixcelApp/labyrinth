
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum UserType {
    Free = "Free",
    Moderator = "Moderator",
    Premium = "Premium",
    Preview = "Preview"
}

export class Entity {
    id: string;
}

export abstract class IMutation {
    abstract createUser(username: string): User | Promise<User>;
}

export abstract class IQuery {
    abstract entity(id: string): Nullable<Entity> | Promise<Nullable<Entity>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    entity: Entity;
    id: string;
    nickname?: Nullable<string>;
    type: UserType;
    username: string;
}

type Nullable<T> = T | null;
