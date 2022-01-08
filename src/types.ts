import express from 'express';

export interface MulterFile {
  key: string
  path: string
  mimetype: string
  originalname: string
  size: number
}

export type RequestWithFile = express.Request & { file: MulterFile };
