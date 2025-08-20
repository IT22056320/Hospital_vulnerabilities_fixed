"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/profile.route.ts
const express_1 = require("express");
const profile_controller_1 = __importDefault(require("../controllers/profile.controller"));
class ProfileRoute {
    constructor() {
        this.profileController = new profile_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/', this.profileController.create.bind(this.profileController));
        this.router.put('/:id', this.profileController.update.bind(this.profileController));
        this.router.get('/:id', this.profileController.findById.bind(this.profileController));
    }
}
exports.default = new ProfileRoute().router;
