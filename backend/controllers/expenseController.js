const xlsx = require('xlsx');
const Expense = require('../models/Expense');

// Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;
        
        // Enhanced validation
        if (!category?.trim() || !amount || !date) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        // Validate category format
        if (!/^[a-zA-Z\s]*$/.test(category)) {
            return res.status(400).json({ msg: 'Category must contain only letters' });
        }

        // Validate amount
        const numAmount = Number(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            return res.status(400).json({ msg: 'Amount must be a positive number' });
        }

        // Check monthly total with error handling
        let currentMonthTotal = 0;
        try {
            currentMonthTotal = await Expense.getCurrentMonthTotal(userId);
        } catch (error) {
            console.error('Monthly total calculation error:', error);
        }

        const newTotal = currentMonthTotal + numAmount;
        const monthlyLimit = 5000;

        const newExpense = new Expense({
            userId,
            icon,
            category: category.trim(),
            amount: numAmount,
            date: new Date(date)
        });
        
        await newExpense.save();
        
        res.status(200).json({
            expense: newExpense,
            warningMsg: newTotal > monthlyLimit ? 'Warning: Monthly limit exceeded!' : null,
            monthlyTotal: newTotal,
            monthlyLimit
        });
    } catch (error) {
        console.error('Add expense error:', error);
        res.status(500).json({ 
            msg: error.name === 'ValidationError' 
                ? 'Invalid input data' 
                : 'Server error',
            error: error.message 
        });
    }
}

// Get all expenses
exports.getAllExpenses = async (req, res) => {
    const userId = req.user.id;
    try{
        const expenses = await Expense.find({userId}).sort({date: -1});
        res.json(expenses);
    }catch(error){
        res.status(500).json({msg: 'Server error'});
    }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({msg: 'Expense deleted successfully'});
        
    } catch (error) {
        res.status(500).json({msg: 'Server error'});
    }
};

// Download expenses as Excel
exports.downloadExpensesExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expenses = await Expense.find({userId}).sort({date: -1});
        
        // Prepare data for excel
        const data = expenses.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: new Date(item.date).toLocaleDateString(),
        }));

        // Create workbook and worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Expenses');

        // Generate buffer
        const excelBuffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        // Set headers for file download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=expense_report.xlsx');
        
        // Send buffer
        res.send(excelBuffer);
    }
    catch (error) {
        console.error('Excel generation error:', error);
        res.status(500).json({msg: 'Error generating excel file'});
    }
};

// Add new endpoint to get monthly stats
exports.getMonthlyStats = async (req, res) => {
    const userId = req.user.id;
    try {
        const currentMonthTotal = await Expense.getCurrentMonthTotal(userId);
        const monthlyLimit = 5000;
        const percentageUsed = (currentMonthTotal / monthlyLimit) * 100;

        res.json({
            currentMonthTotal,
            monthlyLimit,
            percentageUsed,
            remaining: monthlyLimit - currentMonthTotal
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching monthly stats' });
    }
};