import { Box, Flex, IconButton, Spacer, Tooltip } from "@chakra-ui/react";
import React, { useContext } from "react";
import { CiLogout } from "react-icons/ci";
import { OwnerContext } from "../../../context";
import { useNavigate } from "react-router-dom";

const AuthHeader = () => {
  const { resetOwner } = useContext(OwnerContext);
  const navigate = useNavigate();
  const logout = () => {
    resetOwner();
    navigate("/");
  };
  return (
    <Flex>
      <Box />
      <Spacer />
      <Box paddingTop={4} paddingRight={8}>
        <Tooltip label="Çıkış" aria-label="Çıkış">
          <IconButton
            background="transparent"
            icon={<CiLogout size={36} onClick={logout} />}
          />
        </Tooltip>
      </Box>
    </Flex>
  );
};

export default AuthHeader;
