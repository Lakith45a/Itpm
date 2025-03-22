import React from 'react'
import { LuDownload } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCards from '../Cards/TransactionInfoCards'


const ExpenseList = ({transactions,onDelete,onDownload}) => {
  return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg text-purple-800 font-semibold'>All Expenses</h5>
                <button className='card-btn' onClick={onDownload}>
                    <LuDownload className='text-base'/> Download
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                {transactions?.map((expense)=>(
                    <TransactionInfoCards
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={moment(expense.data).format("DD MMM YYYY")}
                        amount={expense.amount}
                        type="expense"
                        onDelete={()=>onDelete(expense._id)}
                    />
                ))}
            </div>
    </div>
)}
export default ExpenseList
