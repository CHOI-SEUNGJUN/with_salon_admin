// import { Router } from 'express';
// import { Controller } from './auth.controller';
const router = require('express').Router();
const controller = require('./auth.controller')

router.post('/sign-in', controller.signIn);

module.exports = router;