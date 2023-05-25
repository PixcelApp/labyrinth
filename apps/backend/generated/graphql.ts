
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum OrganizationType {
    Default = "Default"
}

export enum ProjectType {
    Default = "Default",
    Simple = "Simple"
}

export enum UserType {
    Free = "Free",
    Moderator = "Moderator",
    Premium = "Premium",
    Preview = "Preview"
}

export class Auth {
    password: string;
    user: User;
    userId: string;
}

export class Entity {
    id: string;
}

export abstract class IMutation {
    abstract createProject(name: string): Project | Promise<Project>;

    abstract createUser(username: string): User | Promise<User>;
}

export class Organization {
    entity: Entity;
    id: string;
    members: OrganizationContributor[];
    type: OrganizationType;
}

export class OrganizationContributor {
    organizationId: string;
    permissions: number;
    userId: string;
}

export class Project {
    entity: Entity;
    id: string;
    members: ProjectContributor[];
    name: string;
    type: ProjectType;
}

export class ProjectContributor {
    permissions: number;
    projectId: string;
    userId: string;
}

export abstract class IQuery {
    abstract entity(id: string): Nullable<Entity> | Promise<Nullable<Entity>>;

    abstract project(id: string): Nullable<Organization> | Promise<Nullable<Organization>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    auth: Auth;
    entity: Entity;
    id: string;
    nickname?: Nullable<string>;
    organizationMemberships: OrganizationContributor[];
    projectMemberships: ProjectContributor[];
    type: UserType;
    username: string;
}

type Nullable<T> = T | null;
