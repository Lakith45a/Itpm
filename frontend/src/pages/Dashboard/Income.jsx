import React, { use, useState, useEffect } from 'react'
import { data } from 'react-router-dom';
import IncomeOverview from '../../components/Income/IncomeOverview.jsx';
import Modal from '../../components/Modal.jsx';
import AddIncomeForm from '../../components/Income/AddIncomeForm.jsx';
import { useUserAuth } from '../../hooks/useUserAuth.jsx';
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { API_PATHS } from '../../utils/apiPaths.js';
import IncomeList from '../../components/Income/IncomeList.jsx';

function Income() {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);

  //get all income details 
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
      `${API_PATHS.INCOME.GET_ALL_INCOMES}` // Assuming this is the correct API path
    );
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error('Something went wrong', error);
      toast.error(error.response?.data?.message || 'Failed to fetch income'); 
    } finally {
      setLoading(false);
    }   
  };

  //handle add income
  const handleAddIncome = async(data) => {
    const {source, amount, date, icon} = data;

    //validation checks
    if(!source.trim()){
      toast.error("source is required");
      return;
    }
    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("amount should be a positive number");
      return;
    }
    if(!date){
      toast.error("date is required");
      return;
    } 

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      });

      setOpenAddIncomeModel(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error adding income", error);
      toast.error(error.response?.data?.message || error.message);
    }

  };

  //handle delete income
  const handleDownloadIncomeDetails = async(id) => {};

  //handle download income
  const handleDownloadIncome = async() => {};

  useEffect(() => {
    fetchIncomeDetails();

    return () => {};
  }, []);


  return (
    <DashboardLayout activeMenu="Income">
    <div className="my-5 mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div className="">
          <IncomeOverview 
          transactions={incomeData}
          onAddIncome={() => setOpenAddIncomeModel(true)} />
        </div>
        <IncomeList
              transactions={incomeData}
              OnDelete={(id) => {
                setOpenDeleteAlert({
                  show: true,
                  data: id
                });
              }}
              onDownload={handleDownloadIncomeDetails}

          />
      </div>
      <Modal 
        isOpen={openAddIncomeModel}
        onClose={() => setOpenAddIncomeModel(false)}
        title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome}/>
        </Modal>
    </div>
    </DashboardLayout>
  )
}

export default Income
