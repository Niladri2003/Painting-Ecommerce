import React, { useState } from 'react';
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
} from '@chakra-ui/react';

const productsData = [
    {
        id: "bb648fa1-d3c9-46b6-9df6-a00435534fd8",
        title: "test 1",
        description: "erwerw",
        price: 123,
        category_id: "00000000-0000-0000-0000-000000000000",
        created_at: "0001-01-01T00:00:00Z",
        updated_at: "0001-01-01T00:00:00Z",
        images: [
            {
                id: "fee9a9c8-3e28-419c-9b91-df7c7c60ba81",
                product_id: "00000000-0000-0000-0000-000000000000",
                image_url: "https://res.cloudinary.com/doqoyoxxp/image/upload/v1722974769/paintings_image/st6okuc7dv8dpd9tv2k7.webp",
                created_at: "2024-08-07T01:36:10.487839Z"
            }
        ],
        category: {
            id: "ef338307-06c1-4976-b29f-f6a46973b45d",
            name: "Test 1",
            description: ""
        }
    },
    {
        id: "da5ed7dd-88c0-4fb7-9d6f-36a512248b62",
        title: "product-title-01",
        description: "I'm a product description. This is a great place to \"sell\" your product and grab buyers' attention.",
        price: 1000,
        category_id: "00000000-0000-0000-0000-000000000000",
        created_at: "0001-01-01T00:00:00Z",
        updated_at: "0001-01-01T00:00:00Z",
        images: [
            {
                id: "2ec5097f-87bb-4207-b81a-3481288b41db",
                product_id: "00000000-0000-0000-0000-000000000000",
                image_url: "https://res.cloudinary.com/doqoyoxxp/image/upload/v1722969189/paintings_image/t6ypqbximxn198obhcvn.webp",
                created_at: "2024-08-07T00:03:09.717542Z"
            }
        ],
        category: {
            id: "ef338307-06c1-4976-b29f-f6a46973b45d",
            name: "Test 1",
            description: ""
        }
    },
    {
        id: "fac7b7a3-83e5-4ab0-97df-ef5f3c6f204d",
        title: "product-title-02",
        description: "I'm a product description. This is a great place to \"sell\" your product and grab buyers' attention.",
        price: 1000,
        category_id: "00000000-0000-0000-0000-000000000000",
        created_at: "0001-01-01T00:00:00Z",
        updated_at: "0001-01-01T00:00:00Z",
        images: [
            {
                id: "8db304a1-1c6e-402a-baf1-568d30057fd3",
                product_id: "00000000-0000-0000-0000-000000000000",
                image_url: "https://res.cloudinary.com/doqoyoxxp/image/upload/v1722969172/paintings_image/ileykf6ctrb3yiiuuptz.webp",
                created_at: "2024-08-07T00:02:53.173428Z"
            }
        ],
        category: {
            id: "ef338307-06c1-4976-b29f-f6a46973b45d",
            name: "Test 1",
            description: ""
        }
    }
];

const Products = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleRowClick = (product) => {
        setSelectedProduct(product);
        onOpen();
    };

    return (
        <Box>
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
                    {productsData.map((product) => (
                        <Tr key={product.id} onClick={() => handleRowClick(product)} cursor="pointer">
                            <Td>{product.title}</Td>
                            <Td>{product.description}</Td>
                            <Td>{product.price}</Td>
                            <Td>{product.category.name}</Td>
                        </Tr>
                    ))}
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
