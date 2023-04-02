const fs = require('fs');

class ProductManager {
    constructor () {
        this.products = [];
        this.latestId = 1;
        this.path = './listadoDeProductos.JSON';
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
        id: ++ this.latestId //arreglado el problema del id que debe de ser único y buscar por ID
    }

    this.products.push (newproduct);
    console.log("Producto agregado con éxito");
        fs.writeFile(this.path, JSON.stringify(this.products), (err) => {
            if (err) throw err;
            console.log('Archivo guardado con éxito');
        });
        
    }

    async getProducts(products) {
        const data = await fs.promises.readFile(this.path, 'utf-8'); 
        const productsGet = JSON.parse(data);
        return productsGet;

    /* try {
        const data = fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        return products;
        console.log(products);
    } catch (error) {
        console.log(error);
        return [];
        } */
    }

    async getProductById(productId) {
        const data = await fs.promises.readFile(this.path, 'utf-8'); 
        this.products = JSON.parse(data);
        const product = this.products.find(product => product.id === productId);
        if (product) {
            return product; // Return the product object, not just the ID
        } else {
            console.log("Error: producto no encontrado");
        }
    }

    /* async updateProduct(productId, updateData) {
        const productIndex = this.products.findIndex((product) => product.id === productId);
        if (productIndex === -1) {
        console.error(`Error: product with id ${productId} not found`);
        return;
        }
        const product = this.products[productIndex];
        Object.assign(product, updateData);
        this.products[productIndex] = product;
        await this.saveProducts();
    }
     */
    
    /* async deleteProduct(productId) {
        const productIndex = this.products.findIndex((product) => product.id === productId);
        if (productIndex === -1) {
        console.error(`Error: product with id ${productId} not found`);
        return;
        }
        this.products.splice(productIndex, 1);
        await this.saveProducts();
    } */
}

//ejemplos de uso
const manager = new ProductManager();
manager.addProduct("Camiseta", "camiseta de algodón", 1500, "imagen1.jpg", "CAM01", 1);
manager.addProduct("Pantalon", "Pantalon de seda", 3500, "imagen2.jpg", "PAN01", 1);
manager.addProduct("Zapatillas", "Zapatilla negra", 35000, "imagen3.jpg", "ZAP01", 1);
//console.log(manager.getProducts());
//console.log(manager.getProductById(2).title);
//console.log(manager.getProductById(2).description);

