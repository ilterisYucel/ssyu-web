import { ChakraProvider } from "@chakra-ui/react";
import { OwnerContextProvider } from "./context/index.js";
import { RootRouter } from "./components/routers/index.js";

function App() {
  return (
    <ChakraProvider>
      <OwnerContextProvider>
        <RootRouter />
      </OwnerContextProvider>
    </ChakraProvider>
  );
}

export default App;
