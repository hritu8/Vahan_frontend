import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PersonList from "./Component/PersonList";
import AddPerson from "./Component/AddPerson";
import UpdatePerson from "./Component/UpdatePerson";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PersonList />} />
          <Route path="/add-person" element={<AddPerson />} />
          <Route path="/update-person/:Email" element={<UpdatePerson />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;