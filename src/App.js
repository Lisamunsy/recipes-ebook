import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import PersonalPage from "./Components/PersonalPage";
// import CreateRecette from "./Components/Recettes/CreateRecette";
import './App.css';
import { RecetteForm } from "./Components/Recettes/RecetteForm";
// import ShowRecetteFun from "./Components/Recettes/ShowRecetteFun";

function App() {
  // sessionStorage.setItem('logged', 'false')

  return (
    
    <Router>
            <Routes>
            
            <Route path="/" element={<Home reg='true' logoui='false'/>} />
            <Route path="/signin" element={<Home reg='false' logoui='false'/>} />
            <Route path="/personalpage" element={<PersonalPage reg='true' logoui='true' page='liste'  />} />
            <Route path="/newrecipe" element={<RecetteForm reg='true' logoui='true' update='false'/>} />
            <Route path="/recipe/update/:id" element={<RecetteForm reg='true' logoui='true' update='true'/>} />
            <Route  path="/recipe/:id" element = {<PersonalPage reg='true' logoui='true' page='show' />}/>
            </Routes>
    </Router>
  );
}

export default App;
