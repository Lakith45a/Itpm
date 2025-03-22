const xlsx = require('xlsx');
const Expense = require('../models/Expense');


//  Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const{icon, category, amount, date} = req.body;
        //validation:check if all fields are filled
        if( !category || !amount || !date){
            return res.status(400).json({msg: 'All fields are required'});
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });
        await newExpense.save();
        res.status(200).json(newExpense);
    }catch(error){
        
        res.status(500).json({msg: 'Server error'});
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
        
        //prepare data for excel
        const data = expenses.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Expenses');
        res.download("expense_details.xlsx");
    }
    catch (error) {
        res.status(500).json({msg: 'Server error'});
    }
};