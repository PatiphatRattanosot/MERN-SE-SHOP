const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const OrderModel = require("../models/order.model");
const Cart = require("../models/cart.model");

exports.createCheckoutSession = async (req, res) => {
  const cartItems = req.body.cartItem;
  if (!cartItems) {
    return res.status(404).json({ message: "require cart" });
  }
  const products = cartItems.map((item) => {
    return {
      productId: item.productId,
      quantity: item.quantity,
    };
  });

  //Customer Info
  const customer = await stripe.customers.create({
    metadata: {
      email: req.body.email.toString(),
      cart: JSON.stringify(products),
    },
  });
  console.log(JSON.parse(JSON.stringify(products)));

  const line_items = cartItems.map((item) => {
    return {
      price_data: {
        currency: "thb",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.description,
          metadata: {
            id: item.productId,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "promptpay"],
    shipping_address_collection: {
      allowed_countries: ["TH"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "thb",
          },
          display_name: "Free Shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 4500,
            currency: "thb",
          },
          display_name: "Next Day air",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    customer: customer.id,
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/checkout-success`,
    cancel_url: `${process.env.FRONTEND_URL}/card`,
  });

  res.send({ url: session.url });
};

const clearCart = async (email) => {
  try {
    await Cart.deleteMany({ email: email });
    console.log("Cart is cleared");
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while clearing cart.",
    });
  }
};

const createOrder = async (customer, data) => {
  const product = JSON.parse(customer.metadata.cart);

  // console.log("Email : ", customer.metadata.email);
  // console.log("Customer : ", data.customer);
  // console.log("Product : ", product);
  // console.log("Subtotal : ", data.amount_subtotal);
  // console.log("Total : ", data.amount_total);
  // console.log("Shipping : ", data.customer_details);
  // console.log("Payment Status : ", data.payment_status);

  try {
    const order = await OrderModel.create({
      email: customer.metadata.email,
      customerId: data.customer,
      products: product,
      subtotal: data.amount_subtotal,
      total: data.amount_total,
      shipping: data.customer_details,
      payment_status: data.payment_status,
    });
    await order.save();
    if (order) {
      await clearCart(customer.metadata.email);
      console.log("Order is created");
    }
  } catch (error) {
    console.log(
      error.messages || "Something error occurred while creating order"
    );
  }
};

exports.webhook = async (req, res) => {
  console.log("Webhook is called");

  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK;

  console.log("Endpoint Secret :" + endpointSecret);

  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (error) {
    res.status(400).send({ message: `Webhook Error: ${error.message}` });
  }

  switch (event.type) {
    case "checkout.session.completed":
      console.log("Payment received!");
      let data = event.data.object;
      stripe.customers.retrieve(data.customer).then(async (customer) => {
        try {
          createOrder(customer, data);
        } catch (error) {
          res.status(500).send({ message: `Webhook Error: ${error.message}` });
        }
      });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).end();
};


exports.createOrder = async (req, res) => {
  const { email, customerId, products, subtotal, total, shipping, payment_status } = req.body;

  try {
    const order = await OrderModel.create({
      email: email,
      customerId: customerId,
      products: products,
      subtotal: subtotal,
      total: total,
      shipping: shipping,
      payment_status: payment_status,
    });
    if (!order) {
      res.status(500).send({ message: "Something error occurred while creating order" });
    }
    res.status(200).send({ message: "Order is created", order });
  } catch (error) {
    console.log(
      error.messages || "Something error occurred while creating order"
    );
  }
}