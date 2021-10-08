import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/post.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
      const post = await PostMessage.find();
      res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const postData=async(req,res)=>{
    const {img}=req.body
    const newPostMessage = new PostMessage({img:img,creator:req.userId})
    console.log(newPostMessage)
    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
  
  export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    console.log(post);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}

export default router;

