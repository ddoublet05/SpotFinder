import express from 'express';
import {sendInfo} from '../controller/contactdb.js';

const router = express.Router();

router.post('/', sendInfo);

export default router;