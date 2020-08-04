// import { Router } from 'express';
var express = require('express');
var router = express.Router();

const authRouter = require('./auth');
const salonRouter = require('./salon');
const contentsRouter = require('./contents');

router.use('/auth', authRouter);
router.use('/salon', salonRouter);
router.use('/contents', contentsRouter);

module.exports = router;