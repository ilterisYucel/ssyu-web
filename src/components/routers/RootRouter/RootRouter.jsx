import React, { useContext } from "react";
import AuthRouter from "../AuthRouter/index.js";
import NonAuthRouter from "../NonAuthRouter/index.js";
import { OwnerContext } from "../../../context/OwnerContext";

const RootRouter = () => {
  const { getOwner } = useContext(OwnerContext);
  const owner = JSON.parse(localStorage.getItem("ssyuOwner"));
  const loggendIn =
    (owner?.id && owner?.username) || (getOwner().id && getOwner().username);
  return loggendIn ? <AuthRouter /> : <NonAuthRouter />;
};

export default RootRouter;
