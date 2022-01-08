import { BlogDbConnection } from '../models/blog';
import express from 'express';
import { RequestWithFile } from '../types';
import fs from 'fs';

export const getAllBlogs = async (req: express.Request, res: express.Response) => {

  const response = await BlogDbConnection.find({});

  res.json(response);
};

export const getOneBlog = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  const response = await BlogDbConnection.findById(id);

  if (!response) {
    res.status(404);
    res.send();
  } else {
    res.json(response);
  }
};

export const createBlog = async ({ body, file }: RequestWithFile, res: express.Response) => {
  const { title, description } = body;

  const blogRecord = new BlogDbConnection({
    title,
    description,
    image: file.path.replace('public', ''),
  });

  const response = await blogRecord.save();

  res.json(response);
};

export const updateBlog = async (req: RequestWithFile, res: express.Response) => {
  const { id } = req.params;

  let image;
  if (req.file) {
    fs.unlinkSync(`public${req.body.image}`);
    image = req.file.path.replace('public', '');
  }

  const newData = {
    title: req.body.title,
    description: req.body.description,
    image: image || req.body.image,
  };

  const response = await BlogDbConnection.findByIdAndUpdate(id, newData);

  res.json(response);
};

export const deleteBlog = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  const response = await BlogDbConnection.findByIdAndDelete(id);

  res.json(response);
};
