"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOCUMENT_WAS_DELETED_ERROR = exports.DOCUMENT_WAS_MODIFIED_ERROR = exports.syncFireMelon = void 0;
var sync_1 = require("@nozbe/watermelondb/sync");
var lodash_1 = require("lodash");
/* const ex: SyncObj = {
    todos: {
        excludedFields: [],
        customQuery: firestore.collection('todos').where('color', '==', 'red'),
    },
} */
var defaultExcluded = ['_status', '_changed'];
function syncFireMelon(database, syncObj, db, sessionId, getTimestamp) {
    if (getTimestamp === void 0) { getTimestamp = function () { return new Date().getTime(); }; }
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sync_1.synchronize({
                        database: database,
                        pullChanges: function (_a) {
                            var lastPulledAt = _a.lastPulledAt;
                            return __awaiter(_this, void 0, void 0, function () {
                                var syncTimestamp, lastPulledAtTime, changes, collections;
                                var _this = this;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            syncTimestamp = new Date().getTime();
                                            lastPulledAtTime = new Date(lastPulledAt || 0).getTime();
                                            changes = {};
                                            collections = lodash_1.keys(syncObj);
                                            return [4 /*yield*/, Promise.all(lodash_1.map(collections, function (collectionName) { return __awaiter(_this, void 0, void 0, function () {
                                                    var collectionOptions, query, _a, createdSN, deletedSN, updatedSN, created, updated, deleted;
                                                    var _b;
                                                    return __generator(this, function (_c) {
                                                        switch (_c.label) {
                                                            case 0:
                                                                collectionOptions = syncObj[collectionName];
                                                                query = collectionOptions.customQuery || db.collection(collectionName);
                                                                return [4 /*yield*/, Promise.all([
                                                                        query
                                                                            .where('created_at', '>=', lastPulledAtTime)
                                                                            .where('created_at', '<=', syncTimestamp)
                                                                            .get(),
                                                                        query
                                                                            .where('deleted_at', '>=', lastPulledAtTime)
                                                                            .where('deleted_at', '<=', syncTimestamp)
                                                                            .get(),
                                                                        query
                                                                            .where('updated_at', '>=', lastPulledAtTime)
                                                                            .where('updated_at', '<=', syncTimestamp)
                                                                            .get(),
                                                                    ])];
                                                            case 1:
                                                                _a = _c.sent(), createdSN = _a[0], deletedSN = _a[1], updatedSN = _a[2];
                                                                created = createdSN.docs
                                                                    .filter(function (t) { return t.data().session_id !== sessionId; })
                                                                    .map(function (createdDoc) {
                                                                    var data = createdDoc.data();
                                                                    var ommited = __spreadArrays(defaultExcluded, (collectionOptions.excludedFields || []));
                                                                    var createdItem = lodash_1.omit(data, ommited);
                                                                    return createdItem;
                                                                });
                                                                updated = updatedSN.docs
                                                                    .filter(function (t) { return t.data().session_id !== sessionId && !createdSN.docs.find(function (doc) { return doc.id === t.id; }); })
                                                                    .map(function (updatedDoc) {
                                                                    var data = updatedDoc.data();
                                                                    var ommited = __spreadArrays(defaultExcluded, (collectionOptions.excludedFields || []));
                                                                    var updatedItem = lodash_1.omit(data, ommited);
                                                                    return updatedItem;
                                                                });
                                                                deleted = deletedSN.docs
                                                                    .filter(function (t) { return t.data().session_id !== sessionId; })
                                                                    .map(function (deletedDoc) {
                                                                    return deletedDoc.id;
                                                                });
                                                                changes = __assign(__assign({}, changes), (_b = {}, _b[collectionName] = { created: created, deleted: deleted, updated: updated }, _b));
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); }))];
                                        case 1:
                                            _b.sent();
                                            return [2 /*return*/, { changes: changes, timestamp: +syncTimestamp }];
                                    }
                                });
                            });
                        },
                        pushChanges: function (_a) {
                            var changes = _a.changes, lastPulledAt = _a.lastPulledAt;
                            return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, db.runTransaction(function (transaction) { return __awaiter(_this, void 0, void 0, function () {
                                                var _this = this;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, Promise.all(lodash_1.map(changes, function (row, collectionName) { return __awaiter(_this, void 0, void 0, function () {
                                                                var collectionRef, collectionOptions;
                                                                var _this = this;
                                                                return __generator(this, function (_a) {
                                                                    switch (_a.label) {
                                                                        case 0:
                                                                            collectionRef = db.collection(collectionName);
                                                                            collectionOptions = syncObj[collectionName];
                                                                            return [4 /*yield*/, Promise.all(lodash_1.map(row, function (arrayOfChanged, changeName) { return __awaiter(_this, void 0, void 0, function () {
                                                                                    var isDelete;
                                                                                    var _this = this;
                                                                                    return __generator(this, function (_a) {
                                                                                        switch (_a.label) {
                                                                                            case 0:
                                                                                                isDelete = changeName === 'deleted';
                                                                                                return [4 /*yield*/, Promise.all(lodash_1.map(arrayOfChanged, function (doc) { return __awaiter(_this, void 0, void 0, function () {
                                                                                                        var itemValue, docRef, ommited, data, _a, docFromServer, _b, deleted_at, updated_at, docFromServer, _c, deleted_at, updated_at;
                                                                                                        return __generator(this, function (_d) {
                                                                                                            switch (_d.label) {
                                                                                                                case 0:
                                                                                                                    itemValue = isDelete ? null : doc.valueOf();
                                                                                                                    docRef = isDelete
                                                                                                                        ? collectionRef.doc(doc.toString())
                                                                                                                        : collectionRef.doc(itemValue.id);
                                                                                                                    ommited = __spreadArrays(defaultExcluded, (collectionOptions.excludedFields || []));
                                                                                                                    data = isDelete ? null : lodash_1.omit(itemValue, ommited);
                                                                                                                    _a = changeName;
                                                                                                                    switch (_a) {
                                                                                                                        case 'created': return [3 /*break*/, 1];
                                                                                                                        case 'updated': return [3 /*break*/, 2];
                                                                                                                        case 'deleted': return [3 /*break*/, 4];
                                                                                                                    }
                                                                                                                    return [3 /*break*/, 6];
                                                                                                                case 1:
                                                                                                                    {
                                                                                                                        transaction.set(docRef, __assign(__assign({}, data), { created_at: getTimestamp(), updated_at: getTimestamp(), session_id: sessionId }));
                                                                                                                        return [3 /*break*/, 6];
                                                                                                                    }
                                                                                                                    _d.label = 2;
                                                                                                                case 2: return [4 /*yield*/, transaction.get(docRef)];
                                                                                                                case 3:
                                                                                                                    docFromServer = _d.sent();
                                                                                                                    _b = docFromServer.data(), deleted_at = _b.deleted_at, updated_at = _b.updated_at;
                                                                                                                    if (updated_at > lastPulledAt) {
                                                                                                                        throw new Error(exports.DOCUMENT_WAS_MODIFIED_ERROR);
                                                                                                                    }
                                                                                                                    if (deleted_at > lastPulledAt) {
                                                                                                                        throw new Error(exports.DOCUMENT_WAS_DELETED_ERROR);
                                                                                                                    }
                                                                                                                    transaction.update(docRef, __assign(__assign({}, data), { session_id: sessionId, updated_at: getTimestamp() }));
                                                                                                                    return [3 /*break*/, 6];
                                                                                                                case 4: return [4 /*yield*/, transaction.get(docRef)];
                                                                                                                case 5:
                                                                                                                    docFromServer = _d.sent();
                                                                                                                    _c = docFromServer.data(), deleted_at = _c.deleted_at, updated_at = _c.updated_at;
                                                                                                                    if (updated_at > lastPulledAt) {
                                                                                                                        throw new Error(exports.DOCUMENT_WAS_MODIFIED_ERROR);
                                                                                                                    }
                                                                                                                    if (deleted_at > lastPulledAt) {
                                                                                                                        throw new Error(exports.DOCUMENT_WAS_DELETED_ERROR);
                                                                                                                    }
                                                                                                                    transaction.update(docRef, {
                                                                                                                        deleted_at: getTimestamp(),
                                                                                                                        isDeleted: true,
                                                                                                                        session_id: sessionId,
                                                                                                                    });
                                                                                                                    return [3 /*break*/, 6];
                                                                                                                case 6: return [2 /*return*/];
                                                                                                            }
                                                                                                        });
                                                                                                    }); }))];
                                                                                            case 1:
                                                                                                _a.sent();
                                                                                                return [2 /*return*/];
                                                                                        }
                                                                                    });
                                                                                }); }))];
                                                                        case 1:
                                                                            _a.sent();
                                                                            return [2 /*return*/];
                                                                    }
                                                                });
                                                            }); }))];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); })];
                                        case 1:
                                            _b.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        },
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.syncFireMelon = syncFireMelon;
exports.DOCUMENT_WAS_MODIFIED_ERROR = 'DOCUMENT WAS MODIFIED DURING PULL AND PUSH OPERATIONS';
exports.DOCUMENT_WAS_DELETED_ERROR = 'DOCUMENT WAS DELETED DURING PULL AND PUSH OPERATIONS';
