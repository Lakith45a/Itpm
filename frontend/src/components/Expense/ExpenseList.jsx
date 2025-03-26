import React from 'react'
import { LuDownload } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCards from '../Cards/TransactionInfoCards'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'

const ExpenseList = ({transactions,onDelete,onDownload}) => {
  const handleDownload = async () => {
    if (transactions.length === 0) {
      toast.error('No expense data to download');
      return;
    }

    try {
      toast.loading('Downloading report...');
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      });
      
      if (response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'expense_report.xlsx');
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();
        toast.dismiss();
        toast.success('Report downloaded successfully!');
      }
    } catch (error) {
      toast.dismiss();
      console.error('Download error:', error);
      toast.error('Failed to download. Check if backend server is running.');
    }
  };

  const percentageUsed = (transactions.reduce((acc, curr) => acc + curr.amount, 0) / 5000) * 100;

  return (
    <div className='card'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h5 className='text-lg text-purple-800 font-semibold'>All Expenses</h5>
          <button className='card-btn' onClick={handleDownload}>
            <LuDownload className='text-base'/> Download
          </button>
        </div>

        {/* Monthly Limit Progress */}
        {transactions.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Monthly Limit: $5000</span>
              <span className="text-sm font-medium">
                Used: ${transactions.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  percentageUsed > 100 ? 'bg-red-600' : 
                  percentageUsed > 80 ? 'bg-yellow-400' : 'bg-green-600'
                }`}
                style={{ width: `${Math.min(percentageUsed, 100)}%` }}
              ></div>
            </div>
            {percentageUsed > 100 && (
              <p className="text-red-600 text-sm mt-2">
                Warning: You have exceeded your monthly expense limit!
              </p>
            )}
            {percentageUsed > 80 && percentageUsed <= 100 && (
              <p className="text-yellow-600 text-sm mt-2">
                Warning: You are approaching your monthly expense limit!
              </p>
            )}
          </div>
        )}

        {/* Existing transactions grid */}
        <div className='grid grid-cols-1 md:grid-cols-2'>
          {transactions?.map((expense)=>(
            <TransactionInfoCards
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("DD MMM YYYY")}
              amount={expense.amount}
              type="expense"
              onDelete={()=>onDelete(expense._id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default ExpenseList
