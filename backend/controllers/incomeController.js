const User = require('../models/User');
const Income = require('../models/Income');


//Add Income Source
exports.addIncome= async(req,res)=>{
    const userId = req.user.id;

    try{
            const{icon, source, amount, date} = req.body;
            //validation:check if all fields are filled
            if( !source || !amount || !date){
                return res.status(400).json({msg: 'All fields are required'});
            }
    
            const newIncome = new Income({
                userId,
                icon,
                source,
                amount,
                date: new Date(date)
            });
            await newIncome.save();
            res.status(200).json(newIncome);
    }catch(error){
        res.status(500).json({msg: 'Server error'});
    };
}

//Add Expense
exports.getAllIncome= async(req,res)=>{}

//Delete Income
exports.deleteIncome= async(req,res)=>{}

//Update Income
exports.downloadIncomeExcel= async(req,res)=>{}


