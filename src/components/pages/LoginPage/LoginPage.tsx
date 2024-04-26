import React, { useState, useContext } from "react";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
} from "@chakra-ui/react";
import { OwnerContext } from "../../../context/index.js";
import { client } from "../../../utils/requestUtils.js";
import MainImage from "../../../assets/images/main.jpeg";

export default function LoginPage() {
  const { setOwner } = useContext(OwnerContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authCallback = async () => {
    console.log(username, password);
    try {
      const response = await client.post("/auth", {
        username,
        password,
      });
      setOwner(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>SSYU Giriş</Heading>
          <FormControl id="email">
            <FormLabel>Kullanıcı Adı</FormLabel>
            <Input
              type="email"
              onChange={(ev) => setUsername(ev.currentTarget.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Şifre</FormLabel>
            <Input
              type="password"
              onChange={(ev) => setPassword(ev.currentTarget.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Beni Hatırla</Checkbox>
              <Link color={"blue.500"}>Şifemi Unuttum</Link>
            </Stack>
            <Button
              colorScheme={"blue"}
              variant={"solid"}
              onClick={authCallback}
            >
              Giriş Yap
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src={MainImage} />
      </Flex>
    </Stack>
  );
}
