import React, { useContext, useState } from "react";
import { AuthLayout } from "../../layouts/index.js";
import { CustomerCard } from "../../modules/index.js";
import { CustomerContext } from "../../../context/index.js";
import { NoRecords } from "../../modules/index.js";

import {
  PageToolbar,
  AddorUpdateCustomerModal,
  PageContentGrid,
  CustomerFilterModal,
} from "../../modules/index.js";

const CustomersPage = () => {
  const [customerSearchValue, setCustomerSearchValue] = useState("");
  const [customerSortValue, setCustomerSortValue] = useState({
    name: null,
    registrationDate: null,
  });
  const [customerFilterValue, setCustomerFilterValue] = useState({
    gender: null,
  });

  const { getCustomers } = useContext(CustomerContext);

  const cols = getCustomers(
    customerSearchValue,
    customerSortValue,
    customerFilterValue
  ).map((customer) => <CustomerCard data={customer} />);
  const content = cols.length ? <PageContentGrid cols={cols} /> : <NoRecords />;
  const toolbar = (
    <PageToolbar
      inputPlaceholder="Müşteri Ara"
      tooltipText={"Müşteri Ekle"}
      setSearchValue={setCustomerSearchValue}
      setSortValue={setCustomerSortValue}
      setFilterValue={setCustomerFilterValue}
      modalComponent={AddorUpdateCustomerModal}
      filterModalComponent={CustomerFilterModal}
    />
  );

  return <AuthLayout toolbar={toolbar} children={content}></AuthLayout>;
};

export default CustomersPage;
