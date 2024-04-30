import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  RadioGroup,
  Radio,
  Flex,
  Text,
  ModalFooter,
  Button,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const CustomerFilterModal = ({
  onOpen,
  isOpen,
  onClose,
  modalHeader,
  setFilterValue,
}) => {
  const [value, setValue] = useState("");
  const filterCustomer = () => {
    setFilterValue({ gender: value });
    onClose();
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen} onOpen={onOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalHeader ? modalHeader : "Filtrele"}</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <RadioGroup w="100%" onChange={setValue} value={value}>
            <Text fontSize={24}>Cinsiyet</Text>
            <Stack spacing={5} direction="row">
              <Radio size="lg" value="K">
                Kadın
              </Radio>
              <Radio size="lg" value="E">
                Erkek
              </Radio>
              <Radio size="lg" value="">
                Kaldır
              </Radio>
            </Stack>
          </RadioGroup>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            İptal
          </Button>
          <Button colorScheme="red" onClick={filterCustomer}>
            Filtrele
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomerFilterModal;
