import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { useNavigate } from 'react-router-dom'


const Home = () =>{
  useUserAuth()
 
  

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>  
        Home
      </div>
    </DashboardLayout>
  )
}

export default Home
