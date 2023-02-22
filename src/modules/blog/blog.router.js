import express from 'express'
import { blogAuth, isAuth, userActiveAuth } from './../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import { addBlogSchema } from './blog.validation.js';
import * as blogController from './blog.controller.js';



const blogRouter = express.Router()


blogRouter.post('/addBlog' , isAuth , validation(addBlogSchema) ,  blogController.addBlog)
blogRouter.delete('/deleteOne' , isAuth ,  blogController.deleteOneBlogByOwner)
blogRouter.delete('/deleteAll' , isAuth ,  blogController.deleteAllBlogByOwner)
blogRouter.get('/:id' , isAuth ,  blogController.getBlogById);
blogRouter.get('/' , isAuth ,  blogController.getAllBlogs);
blogRouter.put('/updateBlog' , isAuth , validation(addBlogSchema) , blogController.updateBlogByOwner);


export default blogRouter
