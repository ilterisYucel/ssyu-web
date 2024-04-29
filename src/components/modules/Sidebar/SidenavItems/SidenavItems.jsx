import {
  List,
  ListItem,
  Icon,
  Flex,
  Text,
  Link,
  Tooltip,
  IconButton,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const SidenavItems = ({ ...props }) => {
  let { navItems, actionItems, mode } = props;
  mode = mode || "semi";
  const sidebarItemInOverMode = (item, index) => (
    <ListItem key={index}>
      {item.to ? (
        <Link
          display="block"
          as={NavLink}
          to={item.to}
          _focus={{ bg: "gray.100" }}
          _hover={{
            bg: "gray.200",
          }}
          _activeLink={{ bg: "white", color: "black" }}
          w="full"
          borderRadius="md"
        >
          <Flex alignItems="center" p={2}>
            <Icon boxSize="5" as={item.icon} />
            <Text ml={2}>{item.label}</Text>
          </Flex>
        </Link>
      ) : (
        <Flex
          as="button"
          alignItems="center"
          marginBottom={8}
          p={2}
          onClick={item.action}
          _focus={{ bg: "gray.100" }}
          _hover={{
            bg: "gray.200",
          }}
          w="full"
        >
          <Icon boxSize="5" as={item.icon} />
          <Text ml={2}>{item.label}</Text>
        </Flex>
      )}
    </ListItem>
  );
  const sidebarItemInSemiMode = ({ icon: Icon, ...item }, index) => (
    <ListItem key={index}>
      <Tooltip label={item.label} placement="right">
        {item.to ? (
          <IconButton
            key={index}
            as={NavLink}
            _focus={{ bg: "gray.100" }}
            _activeLink={{ boxShadow: "md", bg: "blue.500", color: "white" }}
            bg="transparent"
            aria-label={item.label}
            borderRadius="xl"
            icon={<Icon />}
            to={item.to}
          />
        ) : (
          <IconButton
            background="transparent"
            icon={<Icon as={item.icon} />}
            onClick={item.action}
          />
        )}
      </Tooltip>
    </ListItem>
  );

  return (
    <VStack>
      <List spacing={3}>
        {mode === "semi"
          ? navItems.map((item, index) => sidebarItemInSemiMode(item, index))
          : navItems.map((item, index) => sidebarItemInOverMode(item, index))}
      </List>
      <Spacer />
      <List spacing={3} position="absolute" bottom={4}>
        {mode === "semi"
          ? actionItems?.map((item, index) =>
              sidebarItemInSemiMode(item, index)
            )
          : actionItems?.map((item, index) =>
              sidebarItemInOverMode(item, index)
            )}
      </List>
    </VStack>
  );
};

export default SidenavItems;
