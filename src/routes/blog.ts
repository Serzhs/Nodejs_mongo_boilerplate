import express from 'express';
import { uploadFile } from '../utils/uploadFile';
import { validateBlogPayload } from '../validations/blog';
import { createBlog, deleteBlog, getAllBlogs, getOneBlog, updateBlog } from '../controllers/blog';

const blogRouter = express.Router();

blogRouter.get('/', getAllBlogs);

blogRouter.get('/:id', getOneBlog);

blogRouter.post('/', uploadFile().single('heroImage'), validateBlogPayload, createBlog);

blogRouter.put('/:id', uploadFile().single('heroImage'), validateBlogPayload, updateBlog);

blogRouter.delete('/:id', deleteBlog);

export { blogRouter };
