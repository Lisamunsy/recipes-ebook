import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import PersonalPage from "./Components/PersonalPage";
import CreateRecette from "./Components/Recettes/CreateRecette";
import './App.css';

function App() {
  // sessionStorage.setItem('logged', 'false')
  return (
    
    <Router>
            <Routes>
            
            <Route path="/" element={<Home reg='true'/>} />
            <Route path="/signin" element={<Home reg='false'/>} />
            <Route path="/personalpage" element={<PersonalPage reg='true'/>} />
            <Route path="/newrecipe" element={<CreateRecette reg='true'/>} />
            
            </Routes>
    </Router>
  );
}

export default App;
