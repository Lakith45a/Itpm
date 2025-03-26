const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    icon:{
        type: String,
                
    },
    category:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    monthlyLimit: {
        type: Number,
        default: 5000 // Default $5000 monthly limit
    }
}, {timestamps: true});

// Add method to check monthly total
ExpenseSchema.statics.getCurrentMonthTotal = async function(userId) {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const result = await this.aggregate([
        {
            $match: {
                userId: mongoose.Types.ObjectId(userId),
                date: { $gte: firstDay, $lte: lastDay }
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" }
            }
        }
    ]);

    return result[0]?.total || 0;
};

module.exports = mongoose.model('Expense', ExpenseSchema);