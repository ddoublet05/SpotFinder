import express from 'express';
import {sendInfo} from '../controller/contactdb.js';

const router = express.Router();

router.route('/')
    .post(sendInfo);

export default router;