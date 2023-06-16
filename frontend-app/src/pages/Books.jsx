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

const API =  `http://${obtenerURLAPI()}/books`;


function items() {
  // llama a los items (array objects items)
  const [items, setItems] = useState([]);

  // guarda un item seleccionado para editar (object item)
  const [selectedItem, setSelectedItem] = useState(null);

  // guarda un item para agregar (object item)
  const [newItem, setNewItem] = useState({ nombre: "", descripcion: "" });

  // logica para el boton de editar
  // usado para el boton de editar (boolean)
  const [valueClose, setValueClose] = useState(false);
  const { isOpen: isEditItemOpen, onOpen: onEditItemOpen, onClose: onEditItemClose } = useDisclosure();
  const { isOpen: isNewItemOpen, onOpen: onNewItemOpen, onClose: onNewItemClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const toast = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(API);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await axios.delete(API + `/${itemId}`);
      console.log(response);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const updateItem = async (itemId) => {
    try {
      const response = await axios.put(API + `/${itemId}`, selectedItem);
      console.log(response.data.mensaje);
      onEditItemClose();
      fetchItems();
      setValueClose(false);
      toast({
        title: "Update Item",
        description: "El item se actualizó correctamente",
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addNewItem = async () => {
    try {
      const response = await axios.post(API, newItem);
      console.log(response.data.mensaje);
      onNewItemClose();
      fetchItems();
      setNewItem({ nombre: "", descripcion: "" });
      toast({
        title: "Agregar Item",
        description: "El item se agregó correctamente",
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const openEdit = (item) => {
    setSelectedItem(item);
    onEditItemOpen();
  };

  const openAdd = () => {
    onNewItemOpen();
  };

  return (
    <Container maxW="7xl" mt={10}>

      <Box bg="teal.50" w="100%" h="3xl" borderRadius="xl" p={4} >

        <Box
          bg="teal.500"
          h="50px"
          color="white"
          borderRadius="md"
          display="flex"
          alignItems="center"
          alignContent="center"
          p={3}
          mb={4}>
          <Heading as="h3" size="md">
            Libros
          </Heading>
          <Spacer />
          <IconButton
            aria-label="add item"
            size="sm"
            icon={<AddIcon />}
            onClick={openAdd} />
        </Box>
        {/*tabla de presetacion de datos*/}
        <Box overflowY="auto" maxHeight="2xl">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th><Center>Isbn</Center></Th>
                  <Th><Center>Title</Center></Th>
                  <Th><Center>Score</Center></Th>
                  <Th><Center>Published date</Center></Th>
                  <Th><Center>Category</Center></Th>
                  <Th><Center>Author</Center></Th>
                  <Th><Center>Editorial</Center></Th>
                  <Th><Center>Editar</Center></Th>
                  <Th><Center>Eliminar</Center></Th>
                </Tr>
              </Thead>
              <Tbody>
                {items.map((item) => (
                  <Tr key={item.isbn}>
                    <Td><Center>{item.isbn}</Center></Td>
                    <Td><Center>{item.title}</Center></Td>
                    <Td><Center>{item.score}</Center></Td>
                    <Td><Center>{item.published_date}</Center></Td>
                    <Td><Center>{item.name_category}</Center></Td>
                    <Td><Center>{item.name_author}</Center></Td>
                    <Td><Center>{item.name_editorial}</Center></Td>
                    <Td>
                      <Center>
                        <IconButton
                          colorScheme="teal"
                          size="sm"
                          icon={<EditIcon />}
                          onClick={() => openEdit(item)} />
                      </Center>
                    </Td>
                    <Td>
                      <Center>
                        <IconButton
                          colorScheme="red"
                          size="sm"
                          icon={<DeleteIcon />}
                          onClick={() => deleteItem(item.isbn)} />
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
      <Modal isOpen={isEditItemOpen} onClose={onEditItemClose} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar el item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input ref={initialRef} value={selectedItem?.title} onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Score</FormLabel>
              <Input value={selectedItem?.score} onChange={(e) => setSelectedItem({ ...selectedItem, score: parseInt(e.target.value) })} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" size="sm" mr={3} onClick={() => updateItem(selectedItem.isbn)}>
              Guardar
            </Button>
            <Button colorScheme="gray" size="sm" onClick={onEditItemClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* formulario para agregar un nuevo item */}
      <Modal isOpen={isNewItemOpen} onClose={onNewItemClose} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar un nuevo libro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Título</FormLabel>
              <Input
                ref={initialRef}
                value={newItem?.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Puntuación</FormLabel>
              <Input
                value={newItem?.score}
                onChange={(e) => setNewItem({ ...newItem, score: e.target.value })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Fecha de publicación</FormLabel>
              <Input
                value={newItem?.published_date}
                onChange={(e) => setNewItem({ ...newItem, published_date: e.target.value })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Categoría</FormLabel>
              <Input
                value={newItem?.id_category}
                onChange={(e) => setNewItem({ ...newItem, id_category: e.target.value })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Autor</FormLabel>
              <Input
                value={newItem?.id_author}
                onChange={(e) => setNewItem({ ...newItem, id_author: e.target.value })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Editorial</FormLabel>
              <Input
                value={newItem?.id_editorial}
                onChange={(e) => setNewItem({ ...newItem, id_editorial: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" size="sm" mr={3} onClick={addNewItem}>
              Guardar
            </Button>
            <Button colorScheme="gray" size="sm" onClick={onNewItemClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>



    </Container>
  );
}

export default items;
