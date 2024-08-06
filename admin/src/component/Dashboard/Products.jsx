import React, { useEffect, useState } from 'react';
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text,
    useToast,
    Select,
    VStack,
    HStack
} from '@chakra-ui/react';
import axios from "axios";
import { BASEAPI } from "../../utils/BASEAPI.js";

const Products = () => {
    const [product, setProduct] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortPrice, setSortPrice] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const toast = useToast({ position: 'top' });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleRowClick = (product) => {
        setSelectedProduct(product);
        onOpen();
    };

    const getAllProducts = async () => {
        try {
            const response = await axios.get(`${BASEAPI}/v1/get-all-product`);
            toast({
                title: response.data.msg,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setProduct(response.data.data);
            setSortedProducts(response.data.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast({
                title: 'Error fetching products',
                description: error.message || 'An error occurred.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    useEffect(() => {
        let sorted = [...product];

        if (sortPrice === 'asc') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortPrice === 'desc') {
            sorted.sort((a, b) => b.price - a.price);
        }

        if (filterCategory) {
            sorted = sorted.filter((p) => p.category.name === filterCategory);
        }

        setSortedProducts(sorted);
    }, [sortPrice, filterCategory, product]);

    return (
        <Box>
            <VStack spacing={4} mb={4}>
                <HStack spacing={4}>
                    <Select placeholder="Sort by Price" onChange={(e) => setSortPrice(e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </Select>
                    <Select placeholder="Filter by Category" onChange={(e) => setFilterCategory(e.target.value)}>
                        {Array.from(new Set(product.map((p) => p.category.name))).map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </Select>
                </HStack>
            </VStack>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Title</Th>
                        <Th>Description</Th>
                        <Th>Price</Th>
                        <Th>Category</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {sortedProducts.length === 0 ? (
                        <Tr>
                            <Td colSpan="4">
                                <Text textAlign="center">No products available.</Text>
                            </Td>
                        </Tr>
                    ) : (
                        sortedProducts.map((product) => (
                            <Tr key={product.id} onClick={() => handleRowClick(product)} cursor="pointer">
                                <Td>{product.title}</Td>
                                <Td>{product.description}</Td>
                                <Td>{product.price}</Td>
                                <Td>{product.category.name}</Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>

            {selectedProduct && (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{selectedProduct.title}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <p><strong>Description:</strong> {selectedProduct.description}</p>
                            <p><strong>Price:</strong> ${selectedProduct.price}</p>
                            <p><strong>Category:</strong> {selectedProduct.category.name}</p>
                            {selectedProduct.images.map((image) => (
                                <img key={image.id} src={image.image_url} alt={selectedProduct.title} width="100%" />
                            ))}
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Box>
    );
};

export default Products;
