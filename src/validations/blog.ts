import { RequestWithFile } from '../types';
import express, { NextFunction } from 'express';
import Joi from 'joi';
import fs from 'fs';

export const validateBlogPayload = (req: RequestWithFile, res: express.Response, next: NextFunction ) => {
  const { title, description } = req.body;

  const schema = Joi.object().keys({
    title: Joi.string().min(3).max(40).required(),
    description: Joi.string().min(10).required(),
  });

  const { error } = schema.validate({ title, description });

  if (error) {

    // delete file if validation fails
    fs.unlinkSync(req.file.path);

    res.status(400);

    const messages = error.details.map(({ message }) => message);

    res.send(messages);
  } else {
    next();
  }
};
