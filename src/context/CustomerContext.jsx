import React from "react";

import { ssyuSort } from "../utils/sortUtils";
import { isIgnored } from "../utils/valueUtils";

const initialCustomerContext = {
  customers: [],
  searchKeywords: ["name", "phone", "email"],
  sortKeywords: ["name", "registrationDate"],
  filterKeywords: ["gender"],
};

const customerContextWrapper = (component) => ({
  ...initialCustomerContext,
  setCustomers: (data) => {
    initialCustomerContext.customers = data;
    component?.setState({ context: customerContextWrapper(component) });
  },
  // TODO implement more generic function
  getCustomers: (
    searchValue = "",
    sortValue = { name: null, registrationDate: null },
    filterValue = { gender: null }
  ) => {
    console.log(filterValue);
    let result = initialCustomerContext.customers.filter((customer) => {
      let ret = true;
      Object.keys(filterValue).forEach((key) => {
        if (
          initialCustomerContext.filterKeywords.includes(key) &&
          !isIgnored(filterValue[key])
        ) {
          ret = customer[key] === filterValue[key];
          console.log("asdsada");
        }
      });
      return ret;
    });
    result = result.filter((customer) => {
      return initialCustomerContext.searchKeywords.some((val) =>
        customer[val].toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    Object.keys(sortValue).forEach((key) => {
      if (initialCustomerContext.sortKeywords.includes(key) && sortValue[key])
        result = ssyuSort(result, key, sortValue[key]);
    });
    return [...result];
  },
  resetCustomers: () => {
    initialCustomerContext.customers = [];
    component?.setState({ context: customerContextWrapper(component) });
  },
  addCustomer: (customer) => {
    initialCustomerContext.customers = [
      ...initialCustomerContext.customers,
      customer,
    ];
    component?.setState({ context: customerContextWrapper(component) });
  },
  deleteCustomer: (customerId) => {
    const newCustomers = initialCustomerContext.customers.filter(
      (customer) => customer.id !== customerId
    );
    initialCustomerContext.customers = [...newCustomers];
    component?.setState({ context: customerContextWrapper(component) });
  },
  updateCustomer: (customerId, data) => {
    const oldCustomer = initialCustomerContext.customers.filter(
      (customer) => customer.id === customerId
    )[0];
    const newCsutomer = { ...oldCustomer, ...data };
    initialCustomerContext.customers = [
      ...initialCustomerContext.customers.filter(
        (customer) => customer.id !== customerId
      ),
      newCsutomer,
    ];
    component?.setState({ context: customerContextWrapper(component) });
  },
});

export const CustomerContext = React.createContext(customerContextWrapper());

export class CustomerContextProvider extends React.Component {
  state = {
    context: customerContextWrapper(this),
  };

  render() {
    return (
      <CustomerContext.Provider value={this.state.context}>
        {this.props.children}
      </CustomerContext.Provider>
    );
  }
}
