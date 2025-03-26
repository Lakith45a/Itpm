import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import toast from 'react-hot-toast'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import Modal from '../../components/Modal'
import ExpenseList from '../../components/Expense/ExpenseList'
import DeleteAlert from '../../components/DeleteAlert'

const Expense = () => {
  useUserAuth()

  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    data: null,
    show: false
  })
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

  // ✅ Get All Expenses Details
  const fetchExpenseDetails = async () => {
    if (loading) return
    setLoading(true)

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSES}`
      )
      if (response.data) {
        setExpenseData(response.data)
      }
    } catch (error) {
      console.error('Something went wrong', error)
      toast.error(error.response?.data?.message || 'Failed to fetch expenses')
    } finally {
      setLoading(false)
    }
  }

  // ✅ Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense

    // Validation checks
    if (!category?.trim()) {
      toast.error('Category is required')
      return
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Amount should be a valid number greater than 0')
      return
    }

    if (!date) {
      toast.error('Date is required')
      return
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon
      })

      setOpenAddExpenseModal(false)
      toast.success('Expense added successfully')
      fetchExpenseDetails()
    } catch (error) {
      console.error(
        'Error adding expense',
        error.response?.data?.message || error.message
      )
    }
  }

  // ✅ Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

      setOpenDeleteAlert({
        show: false,
        data: null
      })

      toast.success('Expense deleted successfully')
      fetchExpenseDetails()
    } catch (error) {
      console.error(
        'Error deleting expense',
        error.response?.data?.message || error.message
      )
    }
  }

  // ✅ handle download expense details
  const handleDownloadExpenseDetails = () => {}

  useEffect(() => {
    fetchExpenseDetails()
  }, [])

  return (
    <DashboardLayout activeMenu='Expense'>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div>
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>

         
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id
              })
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        {/* ✅ Add Expense Modal */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title='Add Expense'
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        {/* ✅ Delete Confirmation Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() =>
            setOpenDeleteAlert({
              show: false,
              data: null
            })
          }
          title='Delete Expense'
        >
          <DeleteAlert
            content='Are you sure you want to delete this expense?'
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense
