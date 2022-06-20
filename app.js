require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authenticate = require('./middlewares/authenticate');

const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const adminRoute = require('./routes/adminRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const checkoutRoute = require('./routes/checkoutRoute');
const orderRoute = require('./routes/orderRoute');

const errorMiddleware = require('./middlewares/error');
const notFoundMiddleware = require('./middlewares/notFound');

const app = express();
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoute);
app.use('/admins', authenticate, adminRoute);
app.use('/users', authenticate, userRoute);
app.use('/products', productRoute);
app.use('/carts', authenticate, cartRoute);
app.use('/checkout', authenticate, checkoutRoute);
app.use('/order', authenticate, orderRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log('server is running on port: ' + port));
