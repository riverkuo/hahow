import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RoutePaths } from '../constants/routes';

const LazyHeroList = lazy(() => import('../pages/hero-list'));
const LazyHeroProfile = lazy(() => import('../pages/hero-profile'));
const LazyHeroLayout = lazy(() => import('../layouts/hero'));
const LazyHome = lazy(() => import('../pages/home'));

export function AppRoutes() {
  return (
    <BrowserRouter basename="/hahow">
      <Routes>
        <Route index element={<LazyHome />} />
        <Route path={RoutePaths.Heroes} element={<LazyHeroLayout />}>
          <Route index element={<LazyHeroList />} />
          <Route path={RoutePaths.HeroId} element={<LazyHeroProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
