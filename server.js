const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./db/User"); 
const Cart=require("./db/cartdata");
const Order = require('./db/order') ;
const Product = require('./db/product') ;
const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://gopica141_db_user:gopica2005@cluster0.unbz6wi.mongodb.net/cust_data")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  app.get('/api/products/all', async (req, res) => {
  try {
    const allProducts = await Product.find({}); 
    res.json(allProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Registered Successfully!" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Registration failed: " + err.message });
  }
});

// --- AUTH: LOGIN ROUTE ---
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    
    if (user) {
      res.json({ status: "Success", userId: user._id });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

app.get('/api/products/:category/:id', async (req, res) => {
  try {
    const { category, id } = req.params;
    console.log("Searching for Product ID:", id, "in Category:", category);
    
    const product = await Product.findOne({ 
      category: { $regex: new RegExp("^" + category + "$", "i") },
      productId: Number(id) 
    });
    
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/api/products/:category', async (req, res) => {
  try {
    const { category } = req.params;
    console.log("Searching for Category List:", category);
    
    const products = await Product.find({ 
      category: { $regex: new RegExp("^" + category + "$", "i") } 
    });
    
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/api/auth/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "Registered Successfully!" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) res.json({ status: "Success", userId: user._id });
    else res.status(401).json({ message: "Invalid credentials" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/cart/:userId", async (req, res) => {
  try {
    
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    const cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      return res.json([]);
    }
    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

 app.put("/api/cart/:userId/:productId", async (req, res) => {
  const { quantity } = req.body;
  const { userId, productId } = req.params;

  try {
    const objectId = new mongoose.Types.ObjectId(userId);
    const cart = await Cart.findOne({ userId: objectId });

    if (cart) {
      const item = cart.items.find(i => i.productId === productId);
      if (item) {
        item.quantity = quantity;
        await cart.save();
        res.json(cart.items);
      } else {
        res.status(404).json({ message: "Item not found in cart" });
      }
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/cart/:userId", async (req, res) => {
  const { userId } = req.params;
  const { productId, name, price, quantity, image } = req.body;

  try {
    const objectId = new mongoose.Types.ObjectId(userId);
    let cart = await Cart.findOne({ userId: objectId });

    if (cart) {
      const itemIndex = cart.items.findIndex(p => p.productId == productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, name, price, quantity, image }); 
      }
      await cart.save();
    } else {
      cart = await Cart.create({ 
        userId: objectId, 
        items: [{ productId, name, price, quantity, image }] 
      });
    }
    
    res.status(200).json(cart.items); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/cart/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
   
    const objectId = new mongoose.Types.ObjectId(userId);
    
    const cart = await Cart.findOneAndUpdate(
      { userId: objectId },
      { $pull: { items: { productId: String(productId) } } },
      { new: true }
    );
    
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/api/orders", async (req, res) => {
    console.log("Received order request:", req.body); 
    try {
        const newOrder = new Order({
            userId: new mongoose.Types.ObjectId(req.body.userId),
            customer: req.body.customer
        });
        await newOrder.save();
        res.status(201).json({ message: "Order Placed!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});

