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
const PrivateChat = new mongoose_1.Schema({
    user1Id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    user2Id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    messages: [{
            type: mongoose_1.Schema.Types.ObjectId,
        }],
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    },
});
exports.default = mongoose_1.default.model('privateChat', PrivateChat);
//# sourceMappingURL=privateChat.js.map