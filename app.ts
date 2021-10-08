import express from 'express';
import mongoose from 'mongoose'

const app = express();
const port = 3000;




main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://root:example@mongo:27017', { dbName: "blog" });

  const kittySchema = new mongoose.Schema({
    name: String
  });

  const Kitten = mongoose.model('Kitten', kittySchema);

  const fluffy = new Kitten({ name: 'fluffy' });

  await fluffy.save();
}

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.get('/aa', (req, res) => {
  res.send('aaaa')
})

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});
