"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginBody = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.loginBody = typebox_1.Type.Object({
    username: typebox_1.Type.String(),
    password: typebox_1.Type.String()
});
//# sourceMappingURL=login.schema.js.map