import { useState } from 'react';
////////////////////3RD PARTY IMPORTS
import { BrowserRouter, Routes, Route } from 'react-router-dom';
/////////////////////////STYLE IMPORTS
import './App.css';
import './styles/containerStyle.scss';
///////////////////COMPONENTS IMPORTS
import Header from './components/layouts/Header';
import Home from './components/layouts/Home';
import Profile from './components/Profile';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import MealForm from './components/MealForm';
import Dashboard from './components/Dashboard';
import Favourites from './components/Favourites';
import Modal from './components/Modal';
//////////////////CONTEXT IMPORTS
import { MealContextProvider } from './contexts/ProductContext';
import { AuthProvider } from './contexts/AuthContext';
function App() {
  const [isModal, setIsModal] = useState(false);
  return (
    <div className="App">
      <AuthProvider>
        <MealContextProvider>
          <BrowserRouter>
            <div /* className="flex_container" */ style={{ height: '100%' }}>
              <Modal setIsModal={setIsModal} isModal={isModal} />

              <Header />
              <Routes>
                <Route
                  exact
                  path="/"
                  element={<Home setIsModal={setIsModal} isModal={isModal} />}
                />
                <Route exact path="/me" element={<Profile />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route
                  exact
                  path="/dashboard/new-meal"
                  element={<MealForm />}
                />
                <Route exact path="/favourites" element={<Favourites />} />
              </Routes>
            </div>
          </BrowserRouter>
        </MealContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
