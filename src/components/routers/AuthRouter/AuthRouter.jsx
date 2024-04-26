import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  CustomersPage,
  MembershipsPage,
  DashboardPage,
  ErrorPage,
} from "../../pages/index.js";
import {
  CustomerContextProvider,
  MembershipContextProvider,
} from "../../../context/index.js";

import { CustomerContext, MembershipContext } from "../../../context/index.js";
import { client } from "../../../utils/requestUtils.js";

const AuthRouter = () => {
  const { setCustomers } = useContext(CustomerContext);
  const { setMemberships } = useContext(MembershipContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await client.get("customers");
        setCustomers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCustomers();
  }, []);

  useEffect(() => {
    const getMemberships = async () => {
      try {
        const response = await client.get("memberships");
        setMemberships(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMemberships();
  }, []);

  return (
    <CustomerContextProvider>
      <MembershipContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/memberships" element={<MembershipsPage />} />
            <Route errorElement={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </MembershipContextProvider>
    </CustomerContextProvider>
  );
};

export default AuthRouter;
