"use strict";
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
        return { products: this.products };
    },
    addProduct(product) {
        const newProduct = Object.assign(Object.assign({}, product), { id: Math.random().toString() });
        this.products.push(newProduct);
        return { newProduct: newProduct };
    },
    deleteProduct(id) {
        const product = this.products.find(p => p.id === id);
        this.products = this.products.filter(p => p.id !== id);
        return { deletedProduct: product };
    },
    updateProduct(product) {
        const selectedProduct = this.products.find(p => p.id === product.id);
        this.products = this.products.map(p => p.id === product.id ? product : p);
        return { updatedProduct: product };
    },
};
module.exports = shopStore;
//# sourceMappingURL=shopFake.js.map