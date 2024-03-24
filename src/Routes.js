import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import Signup from './Pages/Signup';

const Routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routes;
