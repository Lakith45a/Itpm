import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup'; 
import Income from './pages/Dashboard/Income';
import Home from './pages/Dashboard/Home';
import Expense from './pages/Dashboard/Expense';
import UserProvider from './contexts/userContext';
  
function App() {
  return (
  <UserProvider>
    <div>
      <Router>
        <Routes>  
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
      </Router>
    </div>
  </UserProvider>  
  );
};

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated 
    ? <Navigate to="/dashboard" replace /> 
    : <Navigate to="/login" replace />;
};
