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
import { AuthProvider } from './common/hooks/AuthContext';
import ProtectedRoute from './common/hooks/ProtectedRoute';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/" element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            } />
          <Route path="/PlanPage" element={
              <ProtectedRoute>
                <PlanPage />
              </ProtectedRoute>
            } />
          <Route path="/PersonnelPage" element={
            <ProtectedRoute>
              <PersonnelPage />
            </ProtectedRoute>
            } />
          <Route path="/CostPage" element={
            <ProtectedRoute>
              <CostPage />
            </ProtectedRoute>
            } />
          <Route path="/QualityPage" element={
            <ProtectedRoute>
              <QualityPage />
            </ProtectedRoute>
            } />
          <Route path="/SafetyPage" element={
            <ProtectedRoute>
            <SafetyPage />
            </ProtectedRoute>
            } />
          <Route path="/File" element={
            <ProtectedRoute>
            <DocumentPage />
            </ProtectedRoute>
            } />
        </Routes>
      </Router>
      </AuthProvider>
  );
}

export default App;
