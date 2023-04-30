const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const mongoURI = `mongodb://localhost:27017/test`;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));



const productSchema = new mongoose.Schema({
    productid: Number,
    productname: String,
    modelyear: Number,
    price: Number,
    description: String,
});

const Product = mongoose.model('Product', productSchema);

const cors = require('cors');

const app = express();


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.json({ message: 'Hello World' })
});

// Get all products
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Get a product by ID
app.get('/api/products/:productid', async (req, res) => {
    const { productid } = req.params;
    const product = await Product.findOne({ productid });

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
});

// Add a new product
app.post('/api/products', async (req, res) => {
    const { productid, productname, modelyear, price, description } = req.body;

    const product = new Product({
        productid,
        productname,
        modelyear,
        price,
        description,
    });

    await product.save();

    res.json({
        productid: product.productid,
        productname: product.productname,
        modelyear: product.modelyear,
        price: product.price,
        description: product.description,
    });
});

// Update a product by ID
app.put('/api/products/:productid', async (req, res) => {
    const { productid } = req.params;
    const { productname, modelyear, price, description } = req.body;

    const product = await Product.findOneAndUpdate(
        { productid },
        { productname, modelyear, price, description },
        { new: true }
    );

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
});

// Delete a product by ID
app.delete('/api/products/:productid', async (req, res) => {
    const { productid } = req.params;

    const product = await Product.findOneAndDelete({ productid });

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
});

// Search products by price range
app.get('/api/productsprice', async (req, res) => {
    const { minPrice, maxPrice } = req.query;

    const products = await Product.find({ price: { $gte: minPrice, $lte: maxPrice } });

    res.json(products);
});

// Search products by model year
app.get('/api/productsmodel', async (req, res) => {
    const { modelyear } = req.query;

    const products = await Product.find({ modelyear });

    res.json(products);

});

app.listen(5000, () => console.log('Server started on port 5000'));


