import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarCharts from '../../components/Charts/CustomBarCharts.jsx'
import { prepareIncomeBarChartData } from '../../utils/helper.js'

function IncomeOverview({transactions, onAddIncome}) {
    const [charData, setChartData] = useState([]);
          useEffect(() => {
            const result = prepareIncomeBarChartData(transactions);
            setChartData(result);
            return () => {
            }
          }, [transactions]);
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <h5 className='text-lg text-purple-800 font-semibold'>Income overvies</h5>
                <p className='text-xs text-gray-500 mt-0.5'>tRACK UR INCOME</p>
            </div>
            <button className="add-btn" onClick={onAddIncome}>
            <LuPlus className='text-lg'/>
            Add Income
            
        </button>
        </div>
            <div className='mt-10'>
                <CustomBarCharts data={charData} />
            </div>
    </div>
  )
}

export default IncomeOverview
