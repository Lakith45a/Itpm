const Expense = require('../models/Expense');

const {isValidObjectId,Types} = require('mongoose');

exports.getDashboard = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));


        //Fetch total Expense

        consttotalExpenses = await Expense.aggregate([
            {
                $match: {
                    userId: userObjectId
                }},
            { $group:{
                    _id: null,
                    totalExpenses: { $sum: '$amount' }
                
            }}
        ]);

        //Get expense transactions in the last 30 days
        const last30DaysExpenses = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        //get total expense in the last 30 days
        const totalExpensesLast30Days = last30DaysExpensesTransactions.reduce(
            (sum,transaction) => sum + transaction.amount,
            0
        
        );

        //Fetch last 5 transactions (expense)
        const lastTransactions = [

            ...(await Expense.find({userId}).
            sort({date: -1}).
            limit(5))
            .map((txn) => ({
                ...txn.toObject(),
                type: 'expense',})
            ),
        ].sort((a,b) => b.date - a.date); //sort latest first

       res.json({
       totalExpenses: totalExpenses[0]?.total || 0,
       last30DaysExpenses: {
         total: totalExpensesLast30Days,
         transactions: last30DaysExpensesTransactions,
       },
       recentTransactions:lastTransactions,
       });
        


    }catch(error){
        res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}

