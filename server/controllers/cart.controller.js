const Cart = require("../models/cart.model");

exports.createCart = async (req, res) => {
  /**
   * #swagger.tags = ['Cart']
   * #swagger.summary = "Create a new Cart"
   * #swagger.description = 'Endpoint to create a new product in the cart.'
   * #swagger.consumes = ['application/json']
   * #swagger.requestBody = {
   *   required: true,
   *   content: {
   *     'application/json': {
   *       schema: {
   *         type: 'object',
   *         properties: {
   *           productId: { type: 'string', description: 'ID of the product' },
   *           email: { type: 'string', description: 'Email of the user' },
   *           quantity: { type: 'number', description: 'Quantity of the product in the cart' },
   *           name: { type: 'string', description: 'Name of the product' },
   *           price: { type: 'number', description: 'Price of the product' },
   *           image: { type: 'string', description: 'URL or base64 of the product image' },
   *         },
   *         required: ['productId', 'email', 'quantity', 'name', 'price', 'image']
   *       }
   *     }
   *   }
   * }
   * #swagger.response[200] = {
   *   description: "Product added to the cart successfully",
   *   content: {
   *     'application/json': {
   *       schema: {
   *         "$ref": "#/components/schemas/Cart"
   *       }
   *     }
   *   }
   * }
   * #swagger.response[400] = {
   *   description: "Missing product information"
   * }
   * #swagger.response[500] = {
   *   description: "Internal server error"
   * }
   */
  const { productId, email, quantity, name, price, image } = req.body;
  if (!productId || !email || !quantity || !name || !price || !image) {
    return res.status(400).json({ message: "Product information is missing" });
  }

  try {
    const existingItem = await Cart.findOne({ productId, email });
    if (existingItem) {
      existingItem.quantity += quantity;
      const data = await existingItem.save();
      return res.json(data);
    }
    const cart = new Cart({
      productId,
      email,
      quantity,
      name,
      price,
      image,
    });
    const data = await cart.save();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while getting products",
    });
  }
};

exports.getAll = async (req, res) => {
  /**
   * #swagger.tags = ['Cart']
   * #swagger.summary = "Get all cart items"
   * #swagger.description = 'Endpoint to fetch all cart items.'
   * #swagger.response[200] = {
   *   description: "List of cart items",
   *   content: {
   *     'application/json': {
   *       schema: {
   *         type: 'array',
   *         items: {
   *           "$ref": "#/components/schemas/Cart"
   *         }
   *       }
   *     }
   *   }
   * }
   * #swagger.response[404] = {
   *   description: "No cart items found"
   * }
   * #swagger.response[500] = {
   *   description: "Internal server error"
   * }
   */
  try {
    const cartItems = await Cart.find();
    if (!cartItems)
      return res.status(404).json({ message: "Cart item not found" });
    return res.json(cartItems);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Failed to add product to cart.",
    });
  }
};

exports.getByEmail = async (req, res) => {
  /**
   * #swagger.tags = ['Cart']
   * #swagger.summary = "Get cart items by email"
   * #swagger.description = 'Endpoint to fetch cart items for a specific user by email.'
   * #swagger.parameters['email'] = {
   *   in: 'path',
   *   description: 'Email of the user',
   *   required: true,
   *   schema: { type: 'string' }
   * }
   * #swagger.response[200] = {
   *   description: "List of cart items for the given email",
   *   content: {
   *     'application/json': {
   *       schema: {
   *         type: 'array',
   *         items: {
   *           "$ref": "#/components/schemas/Cart"
   *         }
   *       }
   *     }
   *   }
   * }
   * #swagger.response[404] = {
   *   description: "Cart items not found for the email"
   * }
   * #swagger.response[500] = {
   *   description: "Internal server error"
   * }
   */
  const { email } = req.params;
  if (!email) {
    return res.status(404).json({ message: "User email not found" });
  }
  const carts = await Cart.find({ email: req.params.email });
  res.json(carts);
};

exports.update = async (req, res) => {
  /**
   * #swagger.tags = ['Cart']
   * #swagger.summary = "Update cart item"
   * #swagger.description = 'Endpoint to update a product in the cart.'
   * #swagger.parameters['id'] = {
   *   in: 'path',
   *   description: 'ID of the cart item',
   *   required: true,
   *   schema: { type: 'string' }
   * }
   * #swagger.requestBody = {
   *   required: true,
   *   content: {
   *     'application/json': {
   *       schema: {
   *         type: 'object',
   *         properties: {
   *           quantity: { type: 'number', description: 'Updated quantity of the product in the cart' }
   *         }
   *       }
   *     }
   *   }
   * }
   * #swagger.response[200] = {
   *   description: "Cart item updated successfully",
   *   content: {
   *     'application/json': {
   *       schema: {
   *         "$ref": "#/components/schemas/Cart"
   *       }
   *     }
   *   }
   * }
   * #swagger.response[404] = {
   *   description: "Cart item not found"
   * }
   * #swagger.response[500] = {
   *   description: "Internal server error"
   * }
   */
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
      useFindAndModify: false,
    });
    if (!cart) {
      return res.status(404).send({
        message: "Cart item not found.",
      });
    }
    res.send(cart);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Failed to update product in cart.",
    });
  }
};

exports.delete = async (req, res) => {
  /**
   * #swagger.tags = ['Cart']
   * #swagger.summary = "Delete cart item"
   * #swagger.description = 'Endpoint to delete a product from the cart.'
   * #swagger.parameters['id'] = {
   *   in: 'path',
   *   description: 'ID of the cart item to delete',
   *   required: true,
   *   schema: { type: 'string' }
   * }
   * #swagger.response[200] = {
   *   description: "Cart item deleted successfully"
   * }
   * #swagger.response[404] = {
   *   description: "Cart item not found"
   * }
   * #swagger.response[500] = {
   *   description: "Internal server error"
   * }
   */
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndDelete(id);

    if (!cart) {
      return res.status(404).send({
        message: "Cart item not found.",
      });
    }
    res.send({
      message: "Cart item deleted successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Failed to delete product from cart.",
    });
  }
};

exports.clearAllByEmail = async (req, res) => {
  /**
   * #swagger.tags = ['Cart']
   * #swagger.summary = "Clear all cart items by email"
   * #swagger.description = 'Endpoint to clear all cart items for a specific user by email.'
   * #swagger.parameters['email'] = {
   *   in: 'path',
   *   description: 'Email of the user whose cart items will be cleared',
   *   required: true,
   *   schema: { type: 'string' }
   * }
   * #swagger.response[200] = {
   *   description: "All items from the cart for the specified email have been cleared."
   * }
   * #swagger.response[400] = {
   *   description: "Email is required"
   * }
   * #swagger.response[404] = {
   *   description: "No items found for the given email"
   * }
   * #swagger.response[500] = {
   *   description: "Internal server error"
   * }
   */
  const { email } = req.params;

  try {
    if (!email) {
      return res.status(400).send({
        message: "Email is required to clear the cart.",
      });
    }

    const result = await Cart.deleteMany({ email: email });

    if (result.deletedCount === 0) {
      return res.status(404).send({
        message: `No items found for the email ${email} to delete.`,
      });
    }

    res.send({
      message: `All items from the cart for ${email} have been cleared.`,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Failed to clear all items from the cart by email.",
    });
  }
};
