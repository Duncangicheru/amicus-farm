const PORT = process.env.PORT || 5000;
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the app
const app = express();
const port = 5000; // You can use one port for both services

// Enable CORS for React frontend (assuming it runs on localhost:3000)
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection using environment variable
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Plant model
const plantSchema = new mongoose.Schema({
    Name: { type: String, required: true, unique: true },
    Type: { type: String },  // e.g., vegetable, flower, tree, etc.
    PlantingDate: { type: Date },
    quantityPlanted: { type: String },
    manureUsed: { type: String },
    waterUsed: { type: String },
    lastWateringDate: { type: Date },
    nextWateringDate: { type: Date },
    lastSprayDate: { type: Date },
    nextSprayDate: { type: Date },
    lastSprayReason: { type: String },
    nextSprayReason: { type: String },
    expectedHarvestDate: { type: Date }
});

const Plant = mongoose.model('Plant', plantSchema);

// ============================
// Livestock Models
// ============================

// Cow model
const cowSchema = new mongoose.Schema({
    Name: { type: String, required: true, unique: true },
    Breed: String,
    InitialWeight: Number,
    CurrentWeight: Number,
    BuyingPrice: Number,
    Age: Number,
    Color: String,
    LastVetVisit: Date,
    NextVetVisit: Date,
    LastVisitReason: String,
    NextVisitReason: String,
});
const Cow = mongoose.model('Cow', cowSchema);

// Goat model
const goatSchema = new mongoose.Schema({
    Name: { type: String, required: true, unique: true },
    Breed: String,
    InitialWeight: Number,
    CurrentWeight: Number,
    BuyingPrice: Number,
    Age: Number,
    Color: String,
    LastVetVisit: Date,
    NextVetVisit: Date,
    LastVisitReason: String,
    NextVisitReason: String,
});
const Goat = mongoose.model('Goat', goatSchema);

// Sheep model
const sheepSchema = new mongoose.Schema({
    Name: { type: String, required: true, unique: true },
    Breed: String,
    InitialWeight: Number,
    CurrentWeight: Number,
    BuyingPrice: Number,
    Age: Number,
    Color: String,
    LastVetVisit: Date,
    NextVetVisit: Date,
    LastVisitReason: String,
    NextVisitReason: String,
});
const Sheep = mongoose.model('Sheep', sheepSchema);

// Poultry model
const poultrySchema = new mongoose.Schema({
    TotalNumber: { type: Number, required: true, unique: true },
    Breed: String,
    InitialWeight: Number,
    CurrentWeight: Number,
    BuyingPrice: Number,
    Age: Number,
    Color: String,
    LastVetVisit: Date,
    NextVetVisit: Date,
    LastVisitReason: String,
    NextVisitReason: String,
});
const Poultry = mongoose.model('Poultry', poultrySchema);

// Sale model
const saleSchema = new mongoose.Schema({
    Item: { type: String, required: true },          // Required field
    Date: { type: Date, default: Date.now },         // Defaults to the current date
    ProduceType: { type: String, default: "" },      // Defaults to an empty string
    UnitsSold: { type: String, default: "" },        // Defaults to an empty string
    PricePerUnit: { type: String, default: "" },     // Defaults to an empty string
    TotalSales: { type: String, default: "" },       // Defaults to an empty string
    TotalUnitsSoldSoFar: { type: String, default: "" } // Defaults to an empty string
    });

const Sale = mongoose.model('Sale', saleSchema);


// Define the produce schema
const produceSchema = new mongoose.Schema({
    Item: { type: String, required: true, unique: true }, // Name as text
    Date: { type: Date, required: true }, // Date - second in order
    TypeOfProduce: { type: String }, // Type as text (e.g., vegetable, fruit, etc.)
    UnitsProduced: { type: String }, // Quantity as text (e.g., "10 kg", "5 boxes")
    PricePerUnit: { type: String }, // Price as text (e.g., "10", "15.5")
    RemainingUnits: { type: String }, // Remaining quantity as text (e.g., "5 kg")
    TotalUnitsProducedSoFar: { type: String }, // Total produced so far (e.g., "50 kg")
});

const Produce = mongoose.model('Produce', produceSchema);

// ============================
// CRUD Routes for Livestock and Crops
// ============================

// Cow Routes
app.post('/api/livestock/cows', async (req, res) => {
    const cow = new Cow(req.body);
    try {
        await cow.save();
        res.status(201).send(cow);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/livestock/cows', async (req, res) => {
    try {
        const cows = await Cow.find();
        res.status(200).send(cows);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/livestock/cows/:name', async (req, res) => {
    try {
        const cow = await Cow.findOne({ Name: req.params.name });
        if (!cow) {
            return res.status(404).send({ message: 'Cow not found' });
        }
        res.status(200).send(cow);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/api/livestock/cows/:name', async (req, res) => {
    try {
        const cow = await Cow.findOneAndUpdate({ Name: req.params.name }, req.body, { new: true });
        if (!cow) {
            return res.status(404).send({ message: 'Cow not found' });
        }
        res.status(200).send(cow);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/api/livestock/cows/:name', async (req, res) => {
    try {
        const cow = await Cow.findOneAndDelete({ Name: req.params.name });
        if (!cow) {
            return res.status(404).send({ message: 'Cow not found' });
        }
        res.status(200).send({ message: 'Cow deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Goat Routes
app.post('/api/livestock/goats', async (req, res) => {
    const goat = new Goat(req.body);
    try {
        await goat.save();
        res.status(201).send(goat);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/livestock/goats', async (req, res) => {
    try {
        const goats = await Goat.find();
        res.status(200).send(goats);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/livestock/goats/:name', async (req, res) => {
    try {
        const goat = await Goat.findOne({ Name: req.params.name });
        if (!goat) {
            return res.status(404).send({ message: 'Goat not found' });
        }
        res.status(200).send(goat);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/api/livestock/goats/:name', async (req, res) => {
    try {
        const goat = await Goat.findOneAndUpdate({ Name: req.params.name }, req.body, { new: true });
        if (!goat) {
            return res.status(404).send({ message: 'Goat not found' });
        }
        res.status(200).send(goat);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/api/livestock/goats/:name', async (req, res) => {
    try {
        const goat = await Goat.findOneAndDelete({ Name: req.params.name });
        if (!goat) {
            return res.status(404).send({ message: 'Goat not found' });
        }
        res.status(200).send({ message: 'Goat deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Sheep Routes
app.post('/api/livestock/sheep', async (req, res) => {
    const sheep = new Sheep(req.body);
    try {
        await sheep.save();
        res.status(201).send(sheep);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/livestock/sheep', async (req, res) => {
    try {
        const sheep = await Sheep.find();
        res.status(200).send(sheep);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/livestock/sheep/:name', async (req, res) => {
    try {
        const sheep = await Sheep.findOne({ Name: req.params.name });
        if (!sheep) {
            return res.status(404).send({ message: 'Sheep not found' });
        }
        res.status(200).send(sheep);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/api/livestock/sheep/:name', async (req, res) => {
    try {
        const sheep = await Sheep.findOneAndUpdate({ Name: req.params.name }, req.body, { new: true });
        if (!sheep) {
            return res.status(404).send({ message: 'Sheep not found' });
        }
        res.status(200).send(sheep);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/api/livestock/sheep/:name', async (req, res) => {
    try {
        const sheep = await Sheep.findOneAndDelete({ Name: req.params.name });
        if (!sheep) {
            return res.status(404).send({ message: 'Sheep not found' });
        }
        res.status(200).send({ message: 'Sheep deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Poultry Routes
app.post('/api/livestock/poultry', async (req, res) => {
    const poultry = new Poultry(req.body);
    try {
        await poultry.save();
        res.status(201).send(poultry);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/livestock/poultry', async (req, res) => {
    try {
        const poultry = await Poultry.find();
        res.status(200).send(poultry);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/livestock/poultry/:totalNumber', async (req, res) => {
    try {
        const poultry = await Poultry.findOne({ TotalNumber: req.params.totalNumber });
        if (!poultry) {
            return res.status(404).send({ message: 'Poultry not found' });
        }
        res.status(200).send(poultry);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/api/livestock/poultry/:totalNumber', async (req, res) => {
    try {
        const poultry = await Poultry.findOneAndUpdate({ TotalNumber: req.params.totalNumber }, req.body, { new: true });
        if (!poultry) {
            return res.status(404).send({ message: 'Poultry not found' });
        }
        res.status(200).send(poultry);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/api/livestock/poultry/:totalNumber', async (req, res) => {
    try {
        const poultry = await Poultry.findOneAndDelete({ TotalNumber: req.params.totalNumber });
        if (!poultry) {
            return res.status(404).send({ message: 'Poultry not found' });
        }
        res.status(200).send({ message: 'Poultry deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

// ============================
// CRUD Routes for Plants
// ============================

// Create a new plant
app.post('/api/garden/plant', async (req, res) => {
    const plant = new Plant(req.body);
    try {
        await plant.save();
        res.status(201).send(plant);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all plants
app.get('/api/garden/plant', async (req, res) => {
    try {
        const plants = await Plant.find();
        res.status(200).send(plants);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single plant by name
app.get('/api/garden/plant/:name', async (req, res) => {
    try {
        const plant = await Plant.findOne({ Name: req.params.name });
        if (!plant) {
            return res.status(404).send({ message: 'Plant not found' });
        }
        res.status(200).send(plant);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a plant by name
app.put('/api/garden/plant/:name', async (req, res) => {
    try {
        const plant = await Plant.findOneAndUpdate({ Name: req.params.name }, req.body, { new: true });
        if (!plant) {
            return res.status(404).send({ message: 'Plant not found' });
        }
        res.status(200).send(plant);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a plant by name
app.delete('/api/garden/plant/:name', async (req, res) => {
    try {
        const plant = await Plant.findOneAndDelete({ Name: req.params.name });
        if (!plant) {
            return res.status(404).send({ message: 'Plant not found' });
        }
        res.status(200).send({ message: 'Plant deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

// ============================
// Sales Routes
// ============================

// Create a new sale
app.post('/api/sales/sale', async (req, res) => {
    const sale = new Sale(req.body);
    try {
        await sale.save();
        res.status(201).send(sale);
    } catch (error) {
        res.status(400).send({ message: 'Error adding sale', error });
    }
});

// Get all sales
app.get('/api/sales/sale', async (req, res) => {
    try {
        const sales = await Sale.find();
        res.status(200).send(sales);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching sales', error });
    }
});

// Get a single sale by ID
app.get('/api/sales/sale/:id', async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id);
        if (!sale) {
            return res.status(404).send({ message: 'Sale not found' });
        }
        res.status(200).send(sale);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching sale', error });
    }
});

// Update a sale by ID
app.put('/api/sales/sale/:id', async (req, res) => {
    try {
        const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!sale) {
            return res.status(404).send({ message: 'Sale not found' });
        }
        res.status(200).send(sale);
    } catch (error) {
        res.status(400).send({ message: 'Error updating sale', error });
    }
});

// Delete a sale by ID
app.delete('/api/sales/sale/:id', async (req, res) => {
    try {
        const sale = await Sale.findByIdAndDelete(req.params.id);
        if (!sale) {
            return res.status(404).send({ message: 'Sale not found' });
        }
        res.status(200).send({ message: 'Sale deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting sale', error });
    }
});

// ============================
// Produce Routes
// ============================

// Create a new produce item
app.post('/api/production/produce', async (req, res) => {
    const produce = new Produce(req.body);
    try {
        await produce.save();
        res.status(201).send(produce);
    } catch (error) {
        res.status(400).send({ message: 'Error adding produce', error });
    }
});

// Get all produce items
app.get('/api/production/produce', async (req, res) => {
    try {
        const produceItems = await Produce.find();
        res.status(200).send(produceItems);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching produce', error });
    }
});

// Get a single produce item by ID
app.get('/api/production/produce/:id', async (req, res) => {
    try {
        const produce = await Produce.findById(req.params.id); // Use findById instead of findOne by name
        if (!produce) {
            return res.status(404).send({ message: 'Produce not found' });
        }
        res.status(200).send(produce);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching produce', error });
    }
});

// Update a produce item by ID
app.put('/api/production/produce/:id', async (req, res) => {
    try {
        // Calculate the total produce value (optional)
        req.body.TotalProduceValue = req.body.QuantityProduced * req.body.PricePerUnit;

        const produce = await Produce.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Use findByIdAndUpdate
        if (!produce) {
            return res.status(404).send({ message: 'Produce not found' });
        }
        res.status(200).send(produce);
    } catch (error) {
        res.status(400).send({ message: 'Error updating produce', error });
    }
});

// Delete a produce item by ID
app.delete('/api/production/produce/:id', async (req, res) => {
    try {
        const produce = await Produce.findByIdAndDelete(req.params.id); // Use findByIdAndDelete
        if (!produce) {
            return res.status(404).send({ message: 'Produce not found' });
        }
        res.status(200).send({ message: 'Produce deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting produce', error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});