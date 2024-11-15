import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import WelcomePage from './WelcomePage';
import ResetPassword from './ResetPassword';
import LivestockManagement from './LivestockManagement';
import AddCow from './AddCow';
import EditCow from './EditCow';
import AddGoat from './AddGoat';
import EditGoat from './EditGoat';
import AddSheep from './AddSheep';
import EditSheep from './EditSheep';
import AddPoultry from './AddPoultry';
import EditPoultry from './EditPoultry';
import SimpleSubmit from './SimpleSubmit';
import NotFound from './NotFound';
import EditPlant from './EditPlant';
import AddPlant from './AddPlant';
import AddSale from './AddSale'; // Import AddSale component
import AddProduce from './AddProduce'; // Import AddProduce component
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/welcomepage" element={<WelcomePage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/livestock" element={<LivestockManagement />} />

        {/* Cow Routes */}
        <Route path="/addcow" element={<AddCow />} />
        <Route path="/editcow/:cowName" element={<EditCow />} />

        {/* Goat Routes */}
        <Route path="/addgoat" element={<AddGoat />} />
        <Route path="/editgoat/:goatName" element={<EditGoat />} />

        {/* Sheep Routes */}
        <Route path="/addsheep" element={<AddSheep />} />
        <Route path="/editsheep/:sheepName" element={<EditSheep />} />

        {/* Poultry Routes */}
        <Route path="/addpoultry" element={<AddPoultry />} />
        <Route path="/editpoultry/:totalNumber" element={<EditPoultry />} />

        {/* Plant Routes */}
        <Route path="/addplant" element={<AddPlant />} />
        <Route path="/editplant/:PlantName" element={<EditPlant />} />

        {/* Sales Routes */}
        <Route path="/addsale" element={<AddSale />} /> {/* Add AddSale route */}

        {/* Produce Routes */}
        <Route path="/addproduce" element={<AddProduce />} /> {/* Add AddProduce route */}

        {/* Other Routes */}
        <Route path="/submit-item" element={<SimpleSubmit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
