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

const MembershipFilterModal = ({
  onOpen,
  isOpen,
  onClose,
  modalHeader,
  setFilterValue,
}) => {
  const [payment, setPayment] = useState(null);
  const [active, setActive] = useState(null);
  const filterCustomer = () => {
    setFilterValue({ payment, active });
    onClose();
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen} onOpen={onOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalHeader ? modalHeader : "Filtrele"}</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <RadioGroup onChange={setPayment} value={payment}>
            <Text fontSize={24}>Ödeme Drumu</Text>
            <Stack spacing={5} direction="row">
              <Radio size="lg" value="true">
                Ödendi
              </Radio>
              <Radio size="lg" value="false">
                Ödenmedi
              </Radio>
              <Radio size="lg" value="">
                Kaldır
              </Radio>
            </Stack>
            <RadioGroup onChange={setActive} value={active}>
              <Text fontSize={24}>Aktif mi</Text>
              <Stack spacing={5} direction="row">
                <Radio size="lg" value="true">
                  Aktif
                </Radio>
                <Radio size="lg" value="false">
                  Pasif
                </Radio>
                <Radio size="lg" value="">
                  Kaldır
                </Radio>
              </Stack>
            </RadioGroup>
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

export default MembershipFilterModal;
