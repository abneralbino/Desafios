const express = require('express');
const ProductManager = require('./ProductManager.js');

const app = express();
const PUERTO = 9000;

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.get('/products', async (req, res) => {
    const limite = req.query.limite;
    const productManager = new ProductManager();

    try {
        await productManager.load();
        let products = await productManager.getProducts();

        if (limite) {
            products = products.slice(0, parseInt(limite));
        }

        res.json(products);
    } catch (error) {
        console.log(error);
    }
});

app.get('/products/:pid', async (req, res) => {
    
    const productManager = new ProductManager();
    const productId = req.params.pid;

    try {
        await productManager.load();
        const product = await productManager.getProductById(productId);

        if (!product) {
            console.log(`No se encontró ID ${productId}`);
        } else {
            return res.send(product);
        }

    } catch (error) {
        console.log(error);
    }
}); 

app.listen(PUERTO, () => {
    console.log(`Servidor inicializado en puerto ${PUERTO}`);
});
