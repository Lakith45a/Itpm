import React from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'

const Income = () =>{
   useUserAuth()
  return (
    
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>  
        Income
      </div>
    </DashboardLayout>
  )
}

export default Income
