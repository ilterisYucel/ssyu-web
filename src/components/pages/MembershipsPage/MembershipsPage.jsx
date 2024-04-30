import React, { useContext, useEffect, useState } from "react";
import { AuthLayout } from "../../layouts/index.js";
import { MembershipContext } from "../../../context/MembershipContext.jsx";
import { client } from "../../../utils/requestUtils.js";
import {
  AddorUpdateMembershipModal,
  MembershipCard,
  MembershipFilterModal,
  NoRecords,
} from "../../modules/index.js";
import PageContentGrid from "../../modules/PageContentGrid/index.js";
import { PageToolbar } from "../../modules/index.js";
import { CustomerContext } from "../../../context/CustomerContext.jsx";

const MembershipsPage = () => {
  const [membershipSearchValue, setMembershipSearchValue] = useState("");
  const [membershipSortValue, setMembershipSortValue] = useState({
    baginDate: null,
    endDate: null,
  });
  const [membershipFilteValue, setMemberShipFilterValue] = useState({
    payment: null,
    active: null,
  });
  const { getMemberships } = useContext(MembershipContext);
  const { customers } = useContext(CustomerContext);

  const cols = getMemberships(
    membershipSearchValue,
    customers,
    membershipSortValue,
    membershipFilteValue
  ).map((membership) => <MembershipCard data={membership} />);
  const content = cols.length ? <PageContentGrid cols={cols} /> : <NoRecords />;
  const toolbar = (
    <PageToolbar
      inputPlaceholder="Üyelik Ara"
      tooltipText={"Üyelik Ekle"}
      setSearchValue={setMembershipSearchValue}
      setSortValue={setMembershipSortValue}
      setFilterValue={setMemberShipFilterValue}
      modalComponent={AddorUpdateMembershipModal}
      filterModalComponent={MembershipFilterModal}
    />
  );
  return <AuthLayout toolbar={toolbar} children={content}></AuthLayout>;
};

export default MembershipsPage;
