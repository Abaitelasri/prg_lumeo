const express = require('express');
const { PersonController } = require('../controllers/PersonController');

const router = express.Router();
const personController = new PersonController();

router.get('/date', personController.getPeoplePerDate);
router.get('/hour', personController.getPeoplePerHour);
router.get('/direction', personController.getPeoplePerDir);
router.post('/insertData', personController.addPerson);
router.post('/wc', personController.personInWC);

module.exports = router;