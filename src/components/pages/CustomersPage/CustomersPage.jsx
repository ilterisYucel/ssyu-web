import React, { useContext } from "react";
import { AuthLayout } from "../../layouts/index.js";
import { CustomerCard } from "../../modules/index.js";
import { CustomerContext } from "../../../context/index.js";
import { NoRecords } from "../../modules/index.js";

import {
  PageToolbar,
  AddorUpdateCustomerModal,
  PageContentGrid,
} from "../../modules/index.js";

const CustomersPage = () => {
  const { customers } = useContext(CustomerContext);

  const cols = customers.map((customer) => <CustomerCard data={customer} />);
  const content = cols.length ? <PageContentGrid cols={cols} /> : <NoRecords />;
  const toolbar = (
    <PageToolbar
      inputPlaceholder="Müşteri Ara"
      buttonText={"Müşteri Ekle"}
      modalComponent={AddorUpdateCustomerModal}
    />
  );

  return <AuthLayout toolbar={toolbar} children={content}></AuthLayout>;
};

export default CustomersPage;
