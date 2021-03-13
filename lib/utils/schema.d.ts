/// <reference types="@nozbe/watermelondb/schema" />
import { Database, Model } from '@nozbe/watermelondb';
export declare const schema: import("@nozbe/watermelondb").AppSchema;
export declare class Todo extends Model {
    static table: string;
    text: string;
    color: string;
}
export declare class User extends Model {
    static table: string;
    name: string;
}
export default function newDatabase(): Database;
