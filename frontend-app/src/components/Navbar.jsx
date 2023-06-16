import { 
    Box ,
    Flex,
    Spacer,
    ButtonGroup,
    Button,
    Heading,
    HStack,
    Link
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom"

const Navbar = () => {

const navigate = useNavigate();

return (
    <Box bg='teal.500' px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
           <HStack spacing={8} alignItems={'center'}>
             <Box>
                <Heading color='white' size='lg'>DROP_PRUEBA</Heading>
             </Box>
             <HStack>
                <Link color="white" onClick={() => navigate("/books")}>Libros</Link>
                <Link color="white" onClick={() =>  navigate("/loans")}>Prestamos</Link>
                <Link color="white" onClick={() =>  navigate("/users")}>Usuarios</Link>
             </HStack>
           </HStack>
        </Flex>
        <Flex>

        </Flex>
    </Box>
 );
};

export default Navbar;