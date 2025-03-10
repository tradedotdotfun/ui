// src/routes/index.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import TradePage from '../pages/TradePage';
import Layout from '../components/Layout';
import ClosePositionPage from '../pages/ClosePositionPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/trade" element={<TradePage />} />
          <Route path="/close" element={<ClosePositionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
