class ProductManager {
    constructor () {
        this.products = [];
        this.id = 0;
    }

    addProduct (title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Error: todos los campos son obligatorios");
            return; 
        }

    const found = this.products.some(product => product.code === code);
        if (found) {
            console.log(`Error: Ya existe un producto con el código ${code}`);
            return;
        }

    const newproduct = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        id: ++this.id
    }

    this.products.push(newproduct);
        console.log("Producto agregado con éxito");
    }

    getProducts () {
        return this.products;
    }

    getProductById(productId) {
        const product = this.products.find(product => product.id === productId);
        if (product) {
            return product; 
        } else {
            console.log("Error: producto on encontrado");
        }
    }
}

//ejemplos de uso
const manager = new ProductManager();
manager.addProduct("Camiseta", "camiseta de algodón", 1500, "imagen1.jpg", "CAM01", 10);
manager.addProduct("Pantalon", "Pantalon de seda", 3500, "imagen2.jpg", "PAN01", 8);
console.log(manager.getProducts());
console.log(manager.getProductById(1).title);
console.log(manager.getProductById(2).description);