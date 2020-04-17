export const fileStore = {
    files64: [
        {f: 'test'}
    ],

    addFile64 (f: {f: string}) {
        this.files64.push(f);
        return {success: true}
    },

    getFile64 (n: number) {
        if (n > -1 && n < this.files64.length) return this.files64[n];
        else return {error: `n=[${n}] must be between -1 and ${this.files64.length}`}
    }
};
