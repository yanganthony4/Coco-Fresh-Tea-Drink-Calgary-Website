"use client";
import Toolbar from '../components/Toolbar';
import MenuPage from './MenuPage';
import Layout from '../components/Layout';

export default function Page() {
  return (
    <div>
      <Toolbar />
      <MenuPage />
      <Layout/>
    </div>
  );
}
