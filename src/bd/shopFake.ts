const PRODUCT_NAME_UP = 'PRODUCT_NAME_UP';
const PRODUCT_NAME_DOWN = 'PRODUCT_NAME_DOWN';
const PRICE_UP = 'PRICE_UP';
const PRICE_DOWN = 'PRICE_DOWN';

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

    getProducts(productName: string, min: number, max: number, sortProducts: string, page: number, pageCount: number) {
        const productTotalCount = this.products.length;
        const minPrice = Math.min(...this.products.map(p => p.price));
        const maxPrice = Math.max(...this.products.map(p => p.price));

        let someProducts = this.products;

        if (productName) someProducts = someProducts.filter(p => p.productName.indexOf(productName) > -1);
        if (min) someProducts = someProducts.filter(p => p.price >= min && p.price <= max);
        if (sortProducts) {
            switch (sortProducts) {
                case PRODUCT_NAME_UP:
                    someProducts = someProducts.sort((a, b) => a.productName > b.productName
                        ? 1 : a.productName < b.productName ? -1 : 0);
                    break;
                case PRODUCT_NAME_DOWN:
                    someProducts = someProducts.sort((a, b) => a.productName > b.productName
                        ? -1 : a.productName < b.productName ? 1 : 0);
                    break;
                case PRICE_UP:
                    someProducts = someProducts.sort((a, b) => a.price - b.price);
                    break;
                case PRICE_DOWN:
                    someProducts = someProducts.sort((a, b) => b.price - a.price);
                    break;
            }
        }
        if (page && pageCount) {
            if (pageCount * (page - 1) > productTotalCount)
                someProducts = someProducts.slice(pageCount * (page - 1), pageCount * page);
            else someProducts = someProducts.slice(0, pageCount || 7);
        }

        return {
            products: someProducts,
            minPrice,
            maxPrice,
            productTotalCount,
            page,
            pageCount,
        };
    },
    addProduct(product: any) {
        const newProduct = {
            ...product,
            id: Math.random().toString(),
        };

        this.products.push(newProduct);

        return {newProduct: newProduct};
    },
    deleteProduct(id: string) {
        const product = this.products.find(p => p.id === id);
        this.products = this.products.filter(p => p.id !== id);

        return {deletedProduct: product};
    },
    updateProduct(product: any) {
        const selectedProduct = this.products.find(p => p.id === product.id);
        this.products = this.products.map(p => p.id === product.id ? product : p);

        return {updatedProduct: product};
    },

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
