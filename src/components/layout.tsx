import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './header/header';
import { Footer } from './footer/footer';

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet></Outlet>
      <Footer />
    </>
  );
};
