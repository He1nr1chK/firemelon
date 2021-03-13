import { Database } from '@nozbe/watermelondb';
import { FirestoreModule } from './types/firestore';
import { SyncObj } from './types/interfaces';
export declare function syncFireMelon(database: Database, syncObj: SyncObj, db: FirestoreModule, sessionId: string, getTimestamp?: () => any): Promise<void>;
export declare const DOCUMENT_WAS_MODIFIED_ERROR = "DOCUMENT WAS MODIFIED DURING PULL AND PUSH OPERATIONS";
export declare const DOCUMENT_WAS_DELETED_ERROR = "DOCUMENT WAS DELETED DURING PULL AND PUSH OPERATIONS";
