import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3002;

app.use(express.json());

let orders: {id: number, userId:number, orderDetails: string}[] = [];

app.post('/orders', (req, res) => {
    const { userId, orderDetails } = req.body;
    const order = { id: orders.length + 1, userId, orderDetails };
    orders.push(order);
    res.status(201).send(order);
  });
  
  app.get('/orders', async (req, res) => {
    try {
      const detailedOrders = await Promise.all(orders.map(async (order) => {
        const userResponse = await axios.get(`http://user-service:3001/users/${order.userId}`);
        return {
          ...order,
          user: userResponse.data
        };
      }));
      res.status(200).json(detailedOrders);
    } catch (error) {
      res.status(500).send('Error fetching user details');
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Order service running on port ${PORT}`);
  });