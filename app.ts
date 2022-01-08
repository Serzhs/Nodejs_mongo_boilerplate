import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import { blogRouter } from './src/routes/blog';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(cors({
  origin: '*',
}));

mongoose.connect('mongodb://root:example@mongo:27017', { dbName: 'blog' });

app.use('/blog', blogRouter);

app.listen(3000, () => {
  console.log('Blog Running on port 3000.');
});
