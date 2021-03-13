"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Todo = exports.schema = void 0;
var watermelondb_1 = require("@nozbe/watermelondb");
var lokijs_1 = require("@nozbe/watermelondb/adapters/lokijs");
var decorators_1 = require("@nozbe/watermelondb/decorators");
exports.schema = watermelondb_1.appSchema({
    tables: [
        watermelondb_1.tableSchema({
            columns: [
                { name: 'text', type: 'string', isIndexed: true },
                { name: 'color', type: 'string', isIndexed: true },
            ],
            name: 'todos',
        }),
        watermelondb_1.tableSchema({
            columns: [{ name: 'name', type: 'string', isIndexed: true }],
            name: 'users',
        }),
    ],
    version: 1,
});
var Todo = /** @class */ (function (_super) {
    __extends(Todo, _super);
    function Todo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Todo.table = 'todos';
    __decorate([
        (decorators_1.field('text'))
    ], Todo.prototype, "text", void 0);
    __decorate([
        (decorators_1.field('color'))
    ], Todo.prototype, "color", void 0);
    return Todo;
}(watermelondb_1.Model));
exports.Todo = Todo;
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.table = 'users';
    __decorate([
        (decorators_1.field('name'))
    ], User.prototype, "name", void 0);
    return User;
}(watermelondb_1.Model));
exports.User = User;
function newDatabase() {
    var adapter = new lokijs_1.default({
        schema: exports.schema,
    });
    var database = new watermelondb_1.Database({
        actionsEnabled: true,
        adapter: adapter,
        modelClasses: [Todo, User],
    });
    return database;
}
exports.default = newDatabase;
