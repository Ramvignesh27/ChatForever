"use client"
import {
    Box,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router";
  import Login from "../components/authentication/Login";
  import Signup from "../components/authentication/SignUp";
  
  function Homepage() {
    const navigate = useNavigate();
  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
  
      // if (user) navigate("/chats");
    }, []);

    const [value, setValue] = useState("first");
  
    return (
      <Container maxW="xl" centerContent>
        <Box
          display="flex"
          justifyContent="center"
          marginRight="50px"
          p={3}
          bg="grey.950"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
        >
          <Text fontSize="4xl" fontFamily="Work sans" color="white">
            Talk-A-Tive
          </Text>
        </Box>
        <Box bg="gray.950" w="100%" p={4} borderRadius="lg"  color="white">
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    );
  }
  
  export default Homepage;