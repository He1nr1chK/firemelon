"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function timeout(ms) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, ms);
    });
}
exports.default = timeout;
