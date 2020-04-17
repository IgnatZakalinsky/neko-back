"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileStore = {
    files64: [
        { f: 'test' }
    ],
    addFile64(f) {
        this.files64.push(f);
        return { success: true };
    },
    getFile64(n) {
        if (n > -1 && n < this.files64.length)
            return this.files64[n];
        else
            return { error: `n=[${n}] must be between -1 and ${this.files64.length}` };
    }
};
//# sourceMappingURL=fileFake.js.map