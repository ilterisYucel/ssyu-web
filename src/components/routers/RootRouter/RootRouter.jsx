import React, { useContext } from "react";
import AuthRouter from "../AuthRouter/index.js";
import NonAuthRouter from "../NonAuthRouter/index.js";
import { OwnerContext } from "../../../context/OwnerContext";

const RootRouter = () => {
  console.log("Render Root Router");
  const { getOwner } = useContext(OwnerContext);
  const loggendIn = getOwner().id && getOwner().username;
  return loggendIn ? <AuthRouter /> : <NonAuthRouter />;
};

export default RootRouter;
