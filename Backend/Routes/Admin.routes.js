import { signup, login } from '../Controller/Admin.controller.js';
import express from 'express';

const adminRoutes = express.Router();

adminRoutes.post('/', signup);

adminRoutes.post('/login', login);

export default adminRoutes;
