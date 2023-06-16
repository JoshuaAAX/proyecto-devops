import {
  Container,
  Heading,
  Text,
  Button,
  Input,
  useToast,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Flex,
  Spacer,
  IconButton,
  Center
} from "@chakra-ui/react";

import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  Search2Icon,
  SearchIcon,
} from "@chakra-ui/icons";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

// Obtener la URL de la API
function obtenerURLAPI() {
  let urlAPI = "";

  if (window.location.hostname === "localhost") {
    // URL de la API en entorno local
    urlAPI = "localhost:7000";
  } else {
    // URL de la API en entorno remoto
    urlAPI = "24.199.120.226:30528";
  }

  return urlAPI;
}

const API = `http://${obtenerURLAPI()}/users`;

function Users() {

  const [users, setUsers] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [newLoan, setNewLoan] = useState({
    loan_date: "",
    devolution_date: "",
    id_user: "",
    isbn: "",
    delivered: ""
  });

  const [valueClose, setValueClose] = useState(false);
  const { isOpen: isEditLoanOpen, onOpen: onEditLoanOpen, onClose: onEditLoanClose } = useDisclosure();
  const { isOpen: isNewLoanOpen, onOpen: onNewLoanOpen, onClose: onNewLoanClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    fetchusers();
  }, []);

  const fetchusers = async () => {
    try {
      const response = await axios.get(API);
      setUsers(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const updateLoan = async (loanId) => {
    try {
      const response = await axios.put(API + `/${loanId}`, selectedLoan);
      console.log(response.data.mensaje);
      onEditLoanClose();
      fetchusers();
      setValueClose(false);
      toast({
        title: "Update Loan",
        description: "El préstamo se actualizó correctamente",
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addNewLoan = async () => {
    try {
      const response = await axios.post(API, newLoan);
      console.log(response.data.mensaje);
      onNewLoanClose();
      fetchusers();
      setNewLoan({
        loan_date: "",
        devolution_date: "",
        id_user: "",
        isbn: "",
        delivered: ""
      });
      toast({
        title: "Agregar Préstamo",
        description: "El préstamo se agregó correctamente",
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const openEdit = (loan) => {
    setSelectedLoan(loan);
    onEditLoanOpen();
  };

  const openAdd = () => {
    onNewLoanOpen();
  };

  return (
    <Container maxW="7xl" mt={10}>
      <Box bg="teal.50" w="100%" h="3xl" borderRadius="xl" p={4}>
        <Box
          bg="teal.500"
          h="50px"
          color="white"
          borderRadius="md"
          display="flex"
          alignItems="center"
          alignContent="center"
          p={3}
          mb={4}
        >
          <Heading as="h3" size="md">
            Usuarios
          </Heading>
          <Spacer />
          <IconButton
            aria-label="add loan"
            size="sm"
            icon={<AddIcon />}
            onClick={openAdd}
          />
        </Box>
        <Box overflowY="auto" maxHeight="2xl">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>
                    <Center>ID</Center>
                  </Th>
                  <Th>
                    <Center>NOMBRE COMPLETO</Center>
                  </Th>
                  <Th>
                    <Center>CELLPHONE</Center>
                  </Th>
                  <Th>
                    <Center>ADDRESS</Center>
                  </Th>
                  <Th>
                    <Center>ROLES</Center>
                  </Th>
                  <Th>
                    <Center>EMAIL</Center>
                  </Th>
                  <Th>
                    <Center>EDITAR</Center>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user) => (
                  <Tr key={user.id_user}>
                    <Td>
                      <Center>{user.id_user}</Center>
                    </Td>
                    <Td>
                      <Center>{user.full_name}</Center>
                    </Td>
                    <Td>
                      <Center>{user.cellphone}</Center>
                    </Td>
                    <Td>
                      <Center>{user.address}</Center>
                    </Td>
                    <Td>
                      <Center>{user.roles}</Center>
                    </Td>
                    <Td>
                      <Center>{user.email}</Center>
                    </Td>
                    <Td>
                      <Center>
                        <IconButton
                          colorScheme="teal"
                          size="sm"
                          icon={<EditIcon />}
                          onClick={() => openEdit(user)}
                        />
                      </Center>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* formulario de editar */}
      <Modal
        isOpen={isEditLoanOpen}
        onClose={onEditLoanClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Fecha de Préstamo</FormLabel>
              <Input
                ref={initialRef}
                value={selectedLoan?.loan_date}
                onChange={(e) =>
                  setSelectedLoan({ ...selectedLoan, loan_date: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Fecha de Devolución</FormLabel>
              <Input
                value={selectedLoan?.devolution_date}
                onChange={(e) =>
                  setSelectedLoan({
                    ...selectedLoan,
                    devolution_date: e.target.value
                  })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Id del Usuario</FormLabel>
              <Input
                value={selectedLoan?.id_user}
                onChange={(e) =>
                  setSelectedLoan({ ...selectedLoan, id_user: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>ISBN del Libro</FormLabel>
              <Input
                value={selectedLoan?.isbn}
                onChange={(e) =>
                  setSelectedLoan({ ...selectedLoan, isbn: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Entregado</FormLabel>
              <Input
                value={selectedLoan?.delivered}
                onChange={(e) =>
                  setSelectedLoan({ ...selectedLoan, delivered: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              size="sm"
              mr={3}
              onClick={() => updateLoan(selectedLoan.id_loan)}
            >
              Guardar
            </Button>
            <Button colorScheme="gray" size="sm" onClick={onEditLoanClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* formulario para agregar un nuevo préstamo */}
      <Modal
        isOpen={isNewLoanOpen}
        onClose={onNewLoanClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar un nuevo préstamo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Fecha de Préstamo</FormLabel>
              <Input
                ref={initialRef}
                value={newLoan?.loan_date}
                onChange={(e) =>
                  setNewLoan({ ...newLoan, loan_date: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Fecha de Devolución</FormLabel>
              <Input
                value={newLoan?.devolution_date}
                onChange={(e) =>
                  setNewLoan({ ...newLoan, devolution_date: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Id del Usuario</FormLabel>
              <Input
                value={newLoan?.id_user}
                onChange={(e) =>
                  setNewLoan({ ...newLoan, id_user: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>ISBN del Libro</FormLabel>
              <Input
                value={newLoan?.isbn}
                onChange={(e) => setNewLoan({ ...newLoan, isbn: e.target.value })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Entregado</FormLabel>
              <Input
                value={newLoan?.delivered}
                onChange={(e) =>
                  setNewLoan({ ...newLoan, delivered: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              size="sm"
              mr={3}
              onClick={addNewLoan}
            >
              Guardar
            </Button>
            <Button colorScheme="gray" size="sm" onClick={onNewLoanClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default Users;
