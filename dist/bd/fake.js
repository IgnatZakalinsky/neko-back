"use strict";
// @ts-ignore
const store = {
    users: [
        {
            email: 'e',
            password: 'p',
            rememberMe: true,
            token: '0.2342353626'
        }
    ],
    login(email, password, rememberMe) {
        const user = this.users.find(u => u.email === email);
        if (user && user.password === password) {
            const token = Math.random().toString();
            this.users.map(u => u.password === user.password ? Object.assign(Object.assign({}, u), { rememberMe, token }) : u);
            return { name: user.email, token };
        }
        else {
            return { error: 'not correct email/password' };
        }
    },
    register(email, password) {
        const user = this.users.find(u => u.email === email);
        if (!user) {
            this.users.push({
                email,
                password,
                rememberMe: true,
                token: '0'
            });
            return { success: true };
        }
        else {
            return { error: 'email address already exists' };
        }
    },
    forgot(email) {
        const user = this.users.find(u => u.email === email);
        if (user) {
            return { error: "sorry, I can't send new password on your email" };
        }
        else {
            return { error: 'Email address not found' };
        }
    },
    me(token) {
        const user = this.users.find(u => u.token === token);
        if (user) {
            token = Math.random().toString();
            this.users.map(u => u.password === user.password ? Object.assign(Object.assign({}, u), { token }) : u);
            return { name: user.email, token };
        }
        else {
            return { error: 'user not found' };
        }
    }
};
module.exports = store;
//# sourceMappingURL=fake.js.map