"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function authMiddleware(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Token not provided" });
    }
    const [, token] = authorization.split(" ");
    const secret = process.env.JWT_SECRET_KEY;
    if (secret === null || secret === undefined) {
        return res.status(401).json({ error: "Token not provided" });
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, secret);
        const { id } = decoded;
        req.userId = id;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Token invalid" });
    }
}
exports.authMiddleware = authMiddleware;
