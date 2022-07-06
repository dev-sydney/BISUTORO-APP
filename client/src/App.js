////////////////////3RD PARTY IMPORTS
import { BrowserRouter, Routes, Route } from 'react-router-dom';
/////////////////////////STYLE IMPORTS
import './App.css';
import './styles/containerStyle.scss';
///////////////////COMPONENTS IMPORTS
import Sidebar from './components/layouts/Sidebar';
import Home from './components/layouts/Home';
import Profile from './components/Profile';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import MealForm from './components/MealForm';
import Dashboard from './components/Dashboard';
import Favourites from './components/Favourites';
//////////////////CONTEXT IMPORTS
import { MealContextProvider } from './contexts/ProductContext';
import { AuthProvider } from './contexts/AuthContext';
function App() {
  return (
    <div className="App">
      <div className="flex_container">
        <AuthProvider>
          <MealContextProvider>
            <BrowserRouter>
              <Sidebar />
              <Routes>
                <Route exact path="/" element={<Home />} />
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
            </BrowserRouter>
          </MealContextProvider>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
