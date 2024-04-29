import {
  Box,
  useToast,
  ButtonGroup,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spacer,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import { FaSearch } from "react-icons/fa";
// import { MdAddBox } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaFilter, FaSort } from "react-icons/fa6";
import { IoIosRefresh } from "react-icons/io";

import { client } from "../../../utils/requestUtils.js";
import { useContext } from "react";
import { CustomerContext, MembershipContext } from "../../../context/index.js";

const PageToolbar = ({ inputPlaceholder, buttonText, modalComponent }) => {
  const { setCustomers } = useContext(CustomerContext);
  const { setMemberships } = useContext(MembershipContext);
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const ModalCompoent = modalComponent;
  const modal = modalComponent && (
    <ModalCompoent isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
  );

  const refreshData = async () => {
    try {
      const promises = [client.get("customers"), client.get("memberships")];
      const responses = await Promise.all(promises);
      setCustomers(responses[0].data);
      setMemberships(responses[1].data);
    } catch (err) {
      throw new Error(err);
    }
  };

  const refresh = async () => {
    const successToast = {
      title: "Veriler Güncellendi",
      status: "success",
      duration: 3000,
    };
    const failToast = {
      title: "Veriler Güncellenemedi",
      description: "Sunucu çalışmıyor olabilir.",
      status: "error",
      duration: 3000,
    };
    const pendingToast = {
      title: "Veriler Güncelleniyor...",
      status: "info",
      duration: 3000,
    };
    toast.promise(refreshData(), {
      success: successToast,
      error: failToast,
      loading: pendingToast,
    });
  };
  return (
    <>
      <Flex>
        <Box paddingTop={8} paddingLeft={4} width="80%">
          <HStack>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaSearch color="gray.300" />
              </InputLeftElement>
              <Input paddingRight={24} placeholder={inputPlaceholder} />
              <InputRightElement>
                <ButtonGroup spacing="1" marginRight={16}>
                  <IconButton
                    background="transparent"
                    icon={<FaFilter />}
                    color="gray.700"
                    aria-label="filtrele"
                    onClick={() => console.log("OK")}
                  />
                  <IconButton
                    background="transparent"
                    icon={<FaSort />}
                    color="gray.700"
                    aria-label="sırala"
                    onClick={() => console.log("OK")}
                  />
                </ButtonGroup>
              </InputRightElement>
            </InputGroup>
            {/* <IconButton
              background="transparent"
              icon={<IoIosRefresh size={24} />}
              color="gray.700"
              aria-label="yenile"
              onClick={() => window.location.reload()}
            /> */}
          </HStack>
        </Box>
        <Spacer />
        <Box marginLeft={4} paddingTop={8} paddingRight={2}>
          <Tooltip label="Yenile" aria-label="Yenile">
            <IconButton
              colorScheme="green"
              onClick={refresh}
              icon={<IoIosRefresh />}
              aria-label="Yenile"
            >
              {/* {buttonText} */}
            </IconButton>
          </Tooltip>
        </Box>
        <Box paddingTop={8} paddingRight={8}>
          <Tooltip label={buttonText} aria-label={buttonText}>
            <IconButton
              colorScheme="red"
              onClick={onOpen}
              icon={<IoMdAdd />}
              aria-label={buttonText}
            >
              {/* {buttonText} */}
            </IconButton>
          </Tooltip>
        </Box>
      </Flex>
      {modal && modal}
    </>
  );
};

export default PageToolbar;
