// import { Router } from 'express';
// import { Controller } from './auth.controller';
const router = require('express').Router();
const controller = require('./salon.controller')

router.get('/', controller.getSalonList);
router.post('/', controller.createNewSalon);
// router.put('/:salonId', salon.updateSalon);

module.exports = router;