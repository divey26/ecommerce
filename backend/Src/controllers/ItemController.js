const Item = require('./../models/Item');

// Create an item
exports.createItem = async (req, res) => {
  try {
    const { itemName, price, description, imageURL, itemType } = req.body;
    if (!itemName || !price || !description || !itemType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newItem = new Item({ itemName, price, description, imageURL, itemType });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Error creating item' });
  }
};

// Fetch all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching items' });
  }
};
