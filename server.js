const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

let items = [
    { id: 1, name: "Product A", price: 10 },
    { id: 2, name: "Product B", price: 20 },
    { id: 3, name: "Product C", price: 30 },
  ];

  //POST
app.post("/items", (req, res) => {
    const { name, price } = req.body;
    const newItem = { id: items.length + 1, name, price };
    items.push(newItem);
    res.status(201).json(newItem);
  });

 //GET ITEMS
app.get("/items", (req, res) => {
    res.json(items);
  });

 //GET ITEM BY ID
app.get("/items/:id", (req, res) => {
    const item = items.find((b) => b.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  });

  //PUT
  app.put("/items/:id", (req, res) => {
    const item = items.find((i) => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: "Item not found" });
  
    const {name, price } = req.body;
    item.name = name;
    item.price = price;
    res.json(item);
  });

  //DELETE
app.delete("/items/:id", (req, res) => {
    const index = items.findIndex((b) => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Item not found" });
  
    items.splice(index, 1);
    res.status(204).send();
  })