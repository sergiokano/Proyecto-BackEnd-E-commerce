const express = require('express');

const app = express();
const cors = require("cors")
const { typeError } = require('./middleware/errors');
const PORT = 8080
app.use(cors())

app.use(express.json())

app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));
app.use('/orders', require('./routes/orders'));
app.use('/categories', require('./routes/categories'));

app.use(typeError)

app.listen(PORT, () => console.log('Servidor levantado en el puerto ' + PORT))