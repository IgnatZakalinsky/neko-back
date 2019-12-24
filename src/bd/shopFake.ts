// @ts-ignore
const shopStore = {
    products: [
        {
            id: '0.2342353626',
            productName: 'car1',
            price: 3000,
        },
        {
            id: '0.2342353627',
            productName: 'car2',
            price: 1000,
        },
        {
            id: '0.2342353628',
            productName: 'car3',
            price: 5000,
        },

    ],

    getProducts() {
        return {products: this.products};
    }

    // login(email: string, password: string, rememberMe: boolean) {
    //     const user = this.users.find(u => u.email === email);
    //     if (user && user.password === password) {
    //         const token = Math.random().toString();
    //         this.users = this.users.map(u => u.password === user.password ? {...u, rememberMe, token} : u);
    //         return {name: user.email, token}
    //     } else {
    //         return {error: 'not correct email/password'}
    //     }
    // },
    // register(email: string, password: string) {
    //     const user = this.users.find(u => u.email === email);
    //     if (!user) {
    //         this.users.push({
    //             email,
    //             password,
    //             rememberMe: true,
    //             token: '0'
    //         });
    //         return {success: true}
    //     } else {
    //         return {error: 'email address already exists'}
    //     }
    // },
    // forgot(email: string) {
    //     const user = this.users.find(u => u.email === email);
    //     if (user) {
    //         return {error: "sorry, I can't send new password on your email"}
    //     } else {
    //         return {error: 'Email address not found'}
    //     }
    // },
    // me(token: string) {
    //     const user = this.users.find(u => u.token === token);
    //     if (user) {
    //         token = Math.random().toString();
    //         this.users = this.users.map(u => u.password === user.password ? {...u, token} : u);
    //         return {name: user.email, token}
    //     } else {
    //         return {error: 'user not found'}
    //     }
    // },
    // getAll() {
    //     return this.users;
    // }

};

module.exports = shopStore;
