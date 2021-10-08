import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    img: String,
    likes: { type: [String], default: [] },
    creator: String,
});

const PostMessage= mongoose.model('PostMessage',postSchema);

export default PostMessage;