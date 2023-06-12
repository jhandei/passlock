import Manager from './manager';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewEntry from './manager/newPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Manager />}/>
          <Route index element={<Manager />} />
          <Route path="new" element={<NewEntry />} />
      </Routes>
    </Router>
  );
}

export default App;
