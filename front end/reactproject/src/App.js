
import './App.css';
import NavBar from './component/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/register';
import TopSales from './pages/topsales';
import TodaysRevenue from './pages/todaysrevenue';
import Login from './pages/login';
import AddSales from './pages/addsales';

function App() {
  
  return (
    <div>
      <Router>
        <NavBar></NavBar>
        <Routes>
            <Route path="/" element={<Login></Login>} />
            <Route path="/register" element={<Register></Register>} />
            <Route path="/addsales" element={<AddSales></AddSales>} />
            <Route path="/topsales" element={<TopSales></TopSales>} />
            <Route path="/todaysrevenue" element={<TodaysRevenue></TodaysRevenue>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
