export interface DocumentSnapshot {
    id: string;
    data(): any;
}
export interface QuerySnapshot {
    docs: DocumentSnapshot[];
}
export interface DocumentRef {
    get: () => Promise<DocumentSnapshot>;
    set: (data: {
        [key: string]: any;
    }) => Promise<void>;
    update: (data: {
        [key: string]: any;
    }) => Promise<void>;
}
export interface Query {
    where: (field: string, operator: WhereFilterOp, value: any) => Query;
    get: () => Promise<QuerySnapshot>;
}
export interface CollectionRef extends Query {
    add: (data: {
        [key: string]: any;
    }) => Promise<DocumentRef>;
    doc: (documentName: string) => DocumentRef;
}
export declare type WhereFilterOp = '<' | '<=' | '==' | '>=' | '>' | 'array-contains';
export interface Transaction {
    delete(documentRef: any): Transaction;
    get(documentRef: any): Promise<DocumentSnapshot>;
    set(documentRef: any, data: {
        [key: string]: any;
    }): Transaction;
    update(documentRef: any, data: {
        [key: string]: any;
    }): Transaction;
}
export interface FirestoreModule {
    collection: (collectionPath: string) => CollectionRef;
    runTransaction(updateFunction: (transaction: Transaction) => Promise<any>): Promise<any>;
}
