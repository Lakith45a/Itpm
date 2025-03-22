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
  try {
    const allIncome = await Income.find().sort({ date: -1 });
    console.log("Fetched Income:", allIncome);  // Log income to the server console for debugging
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
  try {
    const allIncome = await Income.find().sort({ date: -1 });

    const data = allIncome.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, 'income_details.xlsx');
    res.download('income_details.xlsx');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


