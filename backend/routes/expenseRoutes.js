const express = require('express');
const {addExpense, getAllExpenses, deleteExpense,downloadExpensesExcel} = require('../controllers/expenseController');

const router = express.Router();

router.post('/add', addExpense);
router.get('/all', getAllExpenses);
router.delete('/:id', deleteExpense);
router.get('/download', downloadExpensesExcel);

module.exports = router;