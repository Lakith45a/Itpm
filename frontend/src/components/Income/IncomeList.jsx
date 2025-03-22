import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCards from '../Cards/TransactionInfoCards'
import moment from "moment";


function IncomeList({transactions, onDelete, onDownload}) {
  return (
    <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg text-purple-800 font-semibold'>All Income</h5>
                <button className='card-btn' onClick={onDownload}>
                    <LuDownload className='text-base'/> Download
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                {transactions?.map((income)=>(
                    <TransactionInfoCards
                        key={income._id}
                        title={income.source}
                        icon={income.icon}
                        date={moment(income.data).format("DD MMM YYYY")}
                        amount={income.amount}
                        type="income"
                        onDelete={()=>onDelete(income._id)}
                    />
                ))}
            </div>
    </div>
  )
}

export default IncomeList
