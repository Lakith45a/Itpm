export const BASE_URL = 'http://localhost:8000';


export const API_PATHS = {
    AUTH:{
        LOGIN: '/api/v1/auth/login',
        REGISTER: '/api/v1/auth/register',
        GET_USER_INFO: '/api/v1/auth/getUser',
    },
    DASHBOARD:{
        GET_DATA: '/api/v1/dashboard',
    },
    EXPENSE:{
        ADD_EXPENSE: '/api/v1/expenses/add',
        GET_ALL_EXPENSES: '/api/v1/expenses/get',
        DELETE_EXPENSE: (expenseId) =>`/api/v1/expenses/${expenseId}`,
        DOWNLOAD_EXPENSE: '/api/v1/expenses/download',
    }
}