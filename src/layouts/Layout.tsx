import React from "react";
import { Navbar } from "../components/Navbar/Navbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="container  pb-8 mx-auto lg:px-16 ">{children}</main>
    </>
  );
};
