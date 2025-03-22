const express = require('express');
const {addExpense, getAllExpenses, deleteExpense,downloadExpensesExcel} = require('../controllers/expenseController');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/add', protect, addExpense);
router.get('/get', protect,getAllExpenses);
router.delete('/:id', protect, deleteExpense);
router.get('/downloadexcel', protect, downloadExpensesExcel);

module.exports = router;