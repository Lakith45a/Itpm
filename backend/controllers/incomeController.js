const xlsx = require('xlsx');
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

// Get all income sources
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const allIncome = await Income.find({ userId }).sort({ date: -1 });
    res.json(allIncome);
  } catch (error) {
    console.error("Error fetching income records:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete income source
exports.deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: "Income source deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Download income data as Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        
        if (!incomes || incomes.length === 0) {
            return res.status(404).json({ msg: 'No income records found' });
        }

        const data = incomes.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: new Date(item.date).toLocaleDateString(),
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Income');

        const excelBuffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=income_report.xlsx');
        
        res.send(excelBuffer);
    }
    catch (error) {
        console.error('Excel generation error:', error);
        res.status(500).json({ msg: 'Error generating excel file' });
    }
};


