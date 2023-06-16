const { Router } = require('express');
const router = Router();
const {
  getAllLoans,
  getLoan,
  createLoan,
  updateLoan,
  deleteLoans,
} = require('../controllers/loans.controller');
const pool = require('../db');

//rutas crud prestamos
router.get('/loans', getAllLoans);

router.post('/loans', createLoan);

router.put('/loans/:id', updateLoan);

module.exports = router;
