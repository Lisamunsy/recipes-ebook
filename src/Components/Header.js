import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

// Note: This code could be better,
// so I'd recommend you to understand how I solved and you could write yours better :)
// Good luck! 🍀

// Update: Check these awesome headers from Choc UI 👇
// https://choc-ui.tech/docs/elements/headers
const Header = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  // const{navchange, registered} =props;
  // const onNav =()=>( props.onNav);

  const registered = props.registered;
  const logged = props.logged;
  let navButton;
  let linkNav;

  if (logged=== 'false') {
    if (registered === 'false') {
      navButton = 'Log In';
      linkNav = "/";
    } else  {
      navButton ='Sign In';
      linkNav = "/signin";
    }
  } else{
    navButton ='Log Out';
    linkNav = "/"
  }

  

 
  


  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      bg="orange.400"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          E Recipes
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Link to='/personalpage'>Home</Link>
        <Link to='/newrecipe'>Add a recipe</Link>
        <Text>Blog</Text>
      </Stack>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Link  to={linkNav}>
          <Button
            variant="outline"
            _hover={{ bg: "gray.600", borderColor: "gray.600" }}
          >
          {navButton}
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Header;

