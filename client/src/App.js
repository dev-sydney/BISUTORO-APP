import { useState } from 'react';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from './components/CheckoutForm';
////////////////////3RD PARTY IMPORTS
import { BrowserRouter, Routes, Route } from 'react-router-dom';
/////////////////////////STYLE IMPORTS
import './App.css';
import './styles/containerStyle.scss';
///////////////////COMPONENTS IMPORTS
// import Header from './components/layouts/Header';
// import Home from './pages/Home';
import Profile from './components/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MealForm from './components/MealForm';
import Dashboard from './components/Dashboard';
import Favourites from './components/Favourites';
import Modal from './components/Modal';
import Alert from './components/Alert';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import CartPage from './pages/CartPage';
import SelectedMealPage from './pages/SelectedMealPage';
//////////////////CONTEXT-PROVIDER IMPORTS
import { MealContextProvider } from './contexts/ProductContext';
import { AuthProvider } from './contexts/AuthContext';
///////////////////////STRIPE-INTEGRATION
// const stripePromise = loadStripe(
//   'pk_test_51LHFLYCzMWGZTWYcO8piuiqgYo6Kj3dSdpihgTmnxEpsRvvbKH3Y1CpKhWGtGcvBgUMuB9vJ7hR82fzhTwuhKUgk00FwuueWL2'
// );

function App() {
  const [isModal, setIsModal] = useState(false);

  return (
    <div className="App">
      <AuthProvider>
        <MealContextProvider>
          {/* <Elements stripe={stripePromise}> */}
          <BrowserRouter>
            <Modal setIsModal={setIsModal} isModal={isModal} />
            {/* <Header /> */}
            <Alert />
            <Routes>
              {/* <Route exact path="/checkout" element={<CheckoutForm />} /> */}
              {/* <Route
                  exact
                  path="/"
                  element={<Home setIsModal={setIsModal} isModal={isModal} />}
                /> */}
              <Route exact path="/me" element={<Profile />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/meals" element={<HomePage />} />
              <Route
                exact
                path="/meals/:mealId"
                element={<SelectedMealPage />}
              />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/cart" element={<CartPage />} />
              <Route exact path="/dashboard/new-meal" element={<MealForm />} />
              <Route
                exact
                path="/favourites"
                element={
                  <Favourites setIsModal={setIsModal} isModal={isModal} />
                }
              />
              <Route
                exact
                path="/forgot-password"
                element={<ForgotPassword />}
              />
              <Route
                path="/reset-password/:resetToken"
                element={<ResetPassword />}
              />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
            <NavBar />
          </BrowserRouter>
          {/* </Elements> */}
        </MealContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
