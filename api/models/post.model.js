import mongoose from "mongoose";

// create a post schema

const postSchema = new mongoose.Schema({

        userId: {
            type: String,
            required : true
        },

        content: {
            type: String,
            required : true
        }, 

        title: {
            type: String,
            required : true,
        },

        image: {
            type: String,
            default: 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg'
        },

        category: {
             type: String,
             default: "uncategorized"
        },

        slug: {
            type: String,
            required : true,
            unique: true
        }
},  {timestamps: true}
)
const Post = mongoose.model('Post',postSchema);

export default Post; 

// Send this to controller. 