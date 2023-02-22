import { blogModel } from './../../../databases/models/blog.model.js';


const addBlog = async (req, res) => {
    const { title, content } = req.body;
    if ( req.decoded.status == "active" ){
        let addNewBlog = await blogModel.insertMany({ title, content, addedBy: req.decoded.user_id })
        res.json({ message: "Add Blog successfully", addNewBlog: { title: title, content: content, userEmail: req.decoded.user_email, name: req.decoded.name } })    
    }else {
        res.json({ message : "Sorry Your Account is Still Pending" })
    }
}

const deleteOneBlogByOwner = async (req, res) => {
    const { blog_id } = req.body;
    console.log(blog_id);
    let userId = req.decoded.user_id;
    let blogIsExist = await blogModel.findOne({ _id: blog_id })
    if (blogIsExist ) {
        let findBlog = await blogModel.findOne({ _id: blog_id, addedBy: userId })
        if (findBlog) {
            console.log(findBlog);
            let deleteBlog = await blogModel.findByIdAndDelete({_id: blog_id} , { new : true , projection : { _id :0 , addedBy :0} })
            res.json({ message: "deleted blog successfully", deleteBlog })
        } else {
            res.json({ message: "You can not delete this blog" })
        }
    }else {
        res.json({ message: "This blog is doesing exist!!!!" })
    } 
}

const deleteAllBlogByOwner = async (req, res) => {
    let blogIsExist = await blogModel.find({ addedBy: req.decoded.user_id } , {_id : 0, addedBy :0})
    console.log(blogIsExist);
    if ( blogIsExist.length > 0 ){
        let addedAllBlogs = await blogModel.deleteMany({addedBy: req.decoded.user_id})
        res.json({message : "delete all blogs"  , deleted :{ numberDeleted: addedAllBlogs.deletedCount , status :addedAllBlogs.acknowledged }})
    }else{
        res.json({message : "Empty blogs" })
    }
}

const getBlogById = async ( req , res  ) => {
    const { id } = req.params;
    let blogIsExist = await blogModel.findById({ _id : id}).populate('addedBy' , '-email -password -user_type -user_status -_id')
    if (!blogIsExist) {
        res.json({message : "There is blog" , blogIsExist})
    }else {
        res.json({message : "get blog sucessfully" , blogIsExist})
    }
}

const getAllBlogs = async ( req , res  ) => {
    let blogIsExist = await blogModel.find({ } , { password: 0, _id: 0 }).populate('addedBy' , '-email -password -user_type -user_status -_id')
    if (!blogIsExist) {
        res.json({message : "There is blog" , blogIsExist})
    }else {
        res.json({message : "get blog sucessfully" , blogIsExist})
    }
}

const updateBlogByOwner = async (req, res) => {
    const { _id , title , content} = req.body;
    let userId = req.decoded.user_id;
    let checkBlogIsRelatedToThisUser = await blogModel.findOne( { _id  , addedBy : userId} );
    if ( checkBlogIsRelatedToThisUser ) {
        let updatedBlog = await blogModel.findOneAndUpdate({ _id , addedBy : userId} ,{ title , content} , { new: true, projection:{ _id : 0 , addedBy : 0} })
        res.json({message : " updated blog sucessfully" , updatedBlog})
    }else {
        res.json({message : "You can not update this blog"})
    }
}

export {
    addBlog,
    deleteOneBlogByOwner,
    deleteAllBlogByOwner,
    getBlogById,
    getAllBlogs,
    updateBlogByOwner
}