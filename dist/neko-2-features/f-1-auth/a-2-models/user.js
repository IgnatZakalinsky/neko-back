"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rememberMe: {
        type: Boolean,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    token: {
        type: String,
    },
    tokenDeathTime: {
        type: Number,
    }
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    },
});
exports.default = mongoose_1.default.model('user', UserSchema);
//# sourceMappingURL=user.js.map