import React from "react";

import { ssyuSort } from "../utils/sortUtils";
import { isIgnored } from "../utils/valueUtils";

const initialMembershipContext = {
  memberships: [],
  searchKeywords: ["userId"],
  sortKeywords: ["beginDate", "endDate"],
  filterKeywords: ["payment", "active"],
};

const membershipContextWrapper = (component) => ({
  ...initialMembershipContext,
  setMemberships: (data) => {
    initialMembershipContext.memberships = data;
    component?.setState({ context: membershipContextWrapper(component) });
  },
  getMemberships: (
    searchValue = "",
    customers = [],
    sortValue = { beginDate: null, endDate: null },
    filterValue = { payment: null, active: null }
  ) => {
    let result = initialMembershipContext.memberships.filter((membership) => {
      let ret = true;
      Object.keys(filterValue).forEach((key) => {
        if (
          initialMembershipContext.filterKeywords.includes(key) &&
          !isIgnored(filterValue[key])
        ) {
          if (key === "active") {
            const now = new Date();
            const isActive =
              membership["beginDate"] < now && membership["endDate"] > now;
            ret = JSON.parse(filterValue[key].toLowerCase())
              ? isActive
              : !isActive;
            return;
          }
          ret = membership[key] === JSON.parse(filterValue[key].toLowerCase());
        }
      });
      return ret;
    });
    if (!customers.length) return [...result];
    const resultCustomers = customers.filter((customer) => {
      return ["name", "phone", "email"].some((val) =>
        customer[val].toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    result = initialMembershipContext.memberships.filter((membership) => {
      return resultCustomers.some(
        (customer) => customer.id === membership.customerId
      );
    });
    Object.keys(sortValue).forEach((key) => {
      if (initialMembershipContext.sortKeywords.includes(key) && sortValue[key])
        result = ssyuSort(result, key, sortValue[key]);
    });

    return [...result];
  },
  resetMemberships: () => {
    initialMembershipContext.memberships = [];
    component?.setState({ context: membershipContextWrapper(component) });
  },
  addMembership: (membership) => {
    initialMembershipContext.memberships = [
      ...initialMembershipContext.memberships,
      membership,
    ];
    component?.setState({ context: membershipContextWrapper(component) });
  },
  deleteMembership: (membershipId) => {
    const newCustomers = initialMembershipContext.memberships.filter(
      (membership) => membership.id !== membershipId
    );
    initialMembershipContext.memberships = [...newCustomers];
    component?.setState({ context: membershipContextWrapper(component) });
  },
  updateMembership: (membershipId, data) => {
    const oldMembership = initialMembershipContext.memberships.filter(
      (membership) => membership.id === membershipId
    )[0];
    const newMembership = { ...oldMembership, ...data };
    initialMembershipContext.memberships = [
      ...initialMembershipContext.memberships.filter(
        (membership) => membership.id !== membershipId
      ),
      newMembership,
    ];
    component?.setState({ context: membershipContextWrapper(component) });
  },
});

export const MembershipContext = React.createContext(
  membershipContextWrapper()
);

export class MembershipContextProvider extends React.Component {
  state = {
    context: membershipContextWrapper(this),
  };

  render() {
    return (
      <MembershipContext.Provider value={this.state.context}>
        {this.props.children}
      </MembershipContext.Provider>
    );
  }
}
