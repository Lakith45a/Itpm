import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { useNavigate } from 'react-router-dom'


const Home = () =>{
  useUserAuth()

  const navigate = useNavigate()

  const[dashboardData, setDashboardData] = useState(null);
  const[loading, setLoading] = useState(false);

  const fetchDashboardData = async() =>{
   if(loading) return;
   setLoading(true);

   try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data){
        setDashboardData(response.data);
        
      }
    
   } catch (error) {
     console.error('Server Error:', error);  
   }finally{
    setLoading(false);
   }
  };

  useEffect(() => {
    fetchDashboardData();
    return()=>{};
  }, []);
  

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>  
        Home
      </div>
    </DashboardLayout>
  )
}

export default Home
