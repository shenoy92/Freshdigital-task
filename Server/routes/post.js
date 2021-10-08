import express from 'express';

import { getPosts, likePost, postData} from '../controllers/post.js';
import auth from "../middleware/user.js";
const router = express.Router();


router.get('/', getPosts);
router.post('/',auth,  postData);
router.patch('/:id/likePost', auth, likePost);

export default router;