import './App.css';
import UserPlantsList from './components/screens/UserPlantsList';
import Navbar from './components/common/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlantsDetails from './components/screens/PlantsDetails';
import AddUserPlant from './components/modals/AddUserPlant';
import TaskList from './components/screens/TaskList';
import TaskDetails from './components/screens/TaskDetails';
import Alert from './components/common/Alert';
import { useAlert } from './context/AlertContext';
import React from 'react'
import Footer from './components/common/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { UserContextProvider } from './context/UserContext';

const AppContent = () => {

  const { alert } = useAlert();

  return (
    <Router>
      <UserContextProvider>
      <Navbar />
      {alert && <Alert alert={alert} />}
      <Routes>
        <Route exact path="/" element={<UserPlantsList />} />
        <Route exact path="/learnmore" element={<PlantsDetails />} />
        <Route exact path="/taskList/:plantId" element={<TaskList />} />
        <Route exact path="/taskDetails/:plantId/:id" element={<TaskDetails />} />
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/login' element={<Login/>} />
      </Routes>
      <Footer/>
      </UserContextProvider>
    </Router>
  )
}

export default AppContent
