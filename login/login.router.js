"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const login_controller_1 = require("./login.controller");
const login_schema_1 = require("./login.schema");
const loginRouter = (server) => {
    server.post('/', {
        schema: {
            body: login_schema_1.loginBody
        }
    }, login_controller_1.login);
};
exports.loginRouter = loginRouter;
//# sourceMappingURL=login.router.js.map