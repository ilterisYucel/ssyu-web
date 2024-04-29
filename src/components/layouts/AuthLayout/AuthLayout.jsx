import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { BsBarChart } from "react-icons/bs";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { PiPersonSimpleBold } from "react-icons/pi";
import { LiaFileContractSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
import { Outlet } from "react-router-dom";
import { Sidenav } from "../../modules/index.js";
import { SidenavProvider } from "../../modules/index.js";
import { OwnerContext } from "../../../context/index.js";
export default function AuthLayout({ toolbar = null, children }) {
  const { resetOwner } = useContext(OwnerContext);
  const navigate = useNavigate();
  const logout = () => {
    resetOwner();
    navigate("/");
  };
  const navItems = [
    { icon: BsBarChart, label: "Panel", to: "/" },
    { icon: PiPersonSimpleBold, label: "Müşteriler", to: "/customers" },
    { icon: LiaFileContractSolid, label: "Üyelikler", to: "/memberships" },
    { icon: CiLogout, label: "Çıkış", action: logout },
  ];
  return (
    <Grid
      templateAreas={`'sidebar toolbar'
    'sidebar main'`}
      templateColumns="auto 1fr"
      templateRows="auto 1fr"
    >
      <SidenavProvider>
        <GridItem area="toolbar" w="full">
          {toolbar}
        </GridItem>
        <GridItem area="sidebar" as="aside" w="full" p={0}>
          <Box
            w={{ base: "72px", md: "72px" }}
            paddingTop={{ base: 2, md: 8 }}
            paddingLeft={{ base: 2, md: 0 }}
            height="100vh"
          >
            <Sidenav navItems={navItems} />
          </Box>
        </GridItem>
        <GridItem area="main" w="full">
          <Box>
            <main>
              <div>
                {children}
                <Outlet />
              </div>
            </main>
          </Box>
        </GridItem>
      </SidenavProvider>
    </Grid>
  );
}
