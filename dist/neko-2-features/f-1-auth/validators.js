"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reg = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,7}$/i;
exports.emailValidator = (email) => reg.test(email); // true - valid
exports.passwordValidator = (password) => password.length > 7; // true - valid
//# sourceMappingURL=validators.js.map