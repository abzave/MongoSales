import express from 'express';
import Sale from '../models/Sale';

const router = express.Router();

router.post("/", (request, response) => {
  try{
    const sale = new Sale(request.body);
    const insertedData = sale.save();
    response.json(insertedData);
  } catch (error) {
    response.json({ error: error });
  }
});

module.exports = router;