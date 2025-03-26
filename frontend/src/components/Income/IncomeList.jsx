import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCards from '../Cards/TransactionInfoCards'
import moment from "moment"
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'

function IncomeList({transactions, onDelete, onDownload}) {
  const handleDownload = async () => {
    if (transactions.length === 0) {
      toast.error('No income data to download');
      return;
    }

    try {
      toast.loading('Downloading report...');
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
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
        link.setAttribute('download', 'income_report.xlsx');
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

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg text-purple-800 font-semibold'>All Income</h5>
        <button className='card-btn' onClick={handleDownload}>
          <LuDownload className='text-base'/> Download
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {transactions?.map((income)=>(
          <TransactionInfoCards
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("DD MMM YYYY")}
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
