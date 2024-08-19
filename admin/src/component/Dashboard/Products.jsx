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
import dayjs from "dayjs";

const Products = () => {
    const [product, setProduct] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortPrice, setSortPrice] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const toast = useToast({ position: 'top' });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const token = JSON.parse(localStorage.getItem('token'));

    const handleRowClick = (product) => {
        setSelectedProduct(product);
        onOpen();
    };

    const handleDelete = async () => {
        if (selectedProduct) {
            try {
                await axios.delete(`${BASEAPI}/v1/delete-product/${selectedProduct.id}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                toast({
                    title: 'Product deleted successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                onClose();
                getAllProducts(); // Refresh the product list after deletion
            } catch (error) {
                console.error('Error deleting product:', error);
                toast({
                    title: 'Error deleting product',
                    description: error.message || 'An error occurred.',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }
        }
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
            //console.log(response.data);
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
                                <Td>{product.original_price}</Td>
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
                            <p><strong>Price:</strong> ₹{selectedProduct.original_price}</p>
                            <p><strong>Discount Price:</strong> ₹{selectedProduct.discounted_price}</p>
                            <p><strong>Category:</strong> {selectedProduct.category.name}</p>
                            {selectedProduct.sizes && (
                                <>
                                    <p><strong>Sizes:</strong></p>
                                    <ul>
                                        {selectedProduct.sizes.map((size) => (
                                            <li key={size.id}>
                                                {size.size} - ₹{size.charge}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {selectedProduct.sub_category && (
                                <>
                                    <p><strong>Sub Categories:</strong></p>
                                    <ul>
                                        {selectedProduct.sub_category.map((sub) => (
                                            <li key={sub.id}>
                                                {sub.subcategory} - ₹{sub.charge}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            <div className={"flex flex-row gap-2"}>
                                {selectedProduct.images.map((image) => (
                                    <div className={""}>
                                        <img key={image.id} src={image.image_url} alt={selectedProduct.title}
                                             className={"object-cover h-[40]"}/>
                                    </div>

                                ))}
                            </div>
                            <p>Created at : {dayjs(selectedProduct.created_at).format('DD-MM-YYYY')}</p>
                        </ModalBody>


                        <ModalFooter>
                            <Button colorScheme="red" mr={3} onClick={handleDelete}>
                                Delete
                            </Button>
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
