import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import PredictionPage from '../pages/PredictionPage';
import HighRiskPage from '../pages/HighRiskPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<PredictionPage />} />
        <Route path="/high-risk" element={<HighRiskPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
