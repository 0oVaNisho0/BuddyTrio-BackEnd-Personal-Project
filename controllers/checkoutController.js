const omise = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

exports.checkoutCreditCart = async (req, res, next) => {
  try {
    const { userId, email, nickName, total, token } = req.body;

    const customer = await omise.customers.create({
      email,
      description: `${nickName}, id (${userId})`,
      card: token,
    });

    const charge = await omise.charges.create({
      amount: total,
      currency: 'thb',
      customer: customer.id,
    });

    res.send({
      authorizeUri: charge.authorize_uri,
      status: charge.status,
      amount: charge.amount / 100,
    });
  } catch (err) {
    next(err);
  }
};
