import express from 'express';
import amqp from 'amqplib/callback_api';


const app = express();
const PORT = 3001;

app.use(express.json());

let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
