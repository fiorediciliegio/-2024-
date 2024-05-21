import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainPage from "./common/pages/MainPage.jsx";
import PlanPage from "./common/pages/PlanPage.jsx";
import PersonnelPage from "./common/pages/PersonnelPage.jsx";
import CostPage from "./common/pages/CostPage.jsx";
import QualityPage from "./common/pages/QualityPage.jsx";
import SafetyPage from "./common/pages/SafetyPage.jsx";
import DocumentPage from "./common/pages/DocumentPage.jsx";
import LoginPage from "./common/pages/LoginPage.jsx";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/PlanPage" element={<PlanPage />} />
          <Route path="/PersonnelPage" element={<PersonnelPage />} />
          <Route path="/CostPage" element={<CostPage />} />
          <Route path="/QualityPage" element={<QualityPage />} />
          <Route path="/SafetyPage" element={<SafetyPage />} />
          <Route path="/File" element={<DocumentPage />} />
        </Routes>
      </Router>

  );
}

export default App;
