import React, { useState } from 'react';
import Input from "../Inputs/Input";
import EmojiPickerPopup from '../EmojiPickerPopup';
import toast from 'react-hot-toast';

const AddExpenseForm = ({ onAddExpense }) => {
  const [income, setIncome] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    if (key === 'category' && value) {
      // Only allow letters and spaces
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        toast.error('Category must contain only letters');
        return;
      }
    }
    if (key === 'amount' && value) {
      if (isNaN(value) || value <= 0) {
        toast.error('Amount must be a positive number');
        return;
      }
    }
    setIncome({ ...income, [key]: value });
  };

  const handleAddExpense = () => {
    if (!income.category?.trim()) {
      toast.error('Category is required');
      return;
    }
    if (!income.amount || isNaN(income.amount)) {
      toast.error('Valid amount is required');
      return;
    }
    if (!income.date) {
      toast.error('Date is required');
      return;
    }
    
    onAddExpense(income);
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <div className="space-y-4">
        <Input
          value={income.category}
          onChange={({ target }) => handleChange("category", target.value)}
          label="Category"
          placeholder="Rent, Groceries, etc"
          type="text"
        />
        <Input
          value={income.amount}
          onChange={({ target }) => handleChange("amount", target.value)}
          label="Amount"
          placeholder=""
          type="number"
        />
        <Input
          value={income.date}
          onChange={({ target }) => handleChange("date", target.value)}
          label="Date"
          placeholder=""
          type="date"
        />
      </div>
      <div className='flex justify-end mt-6'>
        <button
          type='button'
          className='add-btn add-btn-fill'
          onClick={handleAddExpense}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
