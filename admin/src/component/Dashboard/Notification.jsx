import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    Center,
    Text,
    useToast,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import {BASEAPI} from "../../utils/BASEAPI.js";

const Notification = () => {
    const [queries, setQueries] = useState([]);
    const [total, setTotal] = useState(0); // Changed Total to total (camelCase)
    const toast = useToast({position:"top"});
    const  token  = JSON.parse(localStorage.getItem("token")) // Accessing state.auth directly

    const getAllQueries = async () => {
        try {
            const response = await axios.get(`${BASEAPI}/v2/get-all-query`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            if(response.status!==200){
                toast({
                    title: 'Error fetching queries',
                    description: error.message || 'An error occurred.',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }
            toast({
                title: 'All Queries Fetched Successfully.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
            setQueries(response.data.data);
            setTotal(response.data.Total); // Setting total from response data
        } catch (error) {
            console.error('Error fetching queries:', error);
            toast({
                title: 'Error fetching queries',
                description: error.message || 'An error occurred.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${BASEAPI}/v2/delete-query`, {
                headers: {
                    Authorization: `${token}`,
                },
                data: { id },
            });
            if (response.status === 200) {
                toast({
                    title: 'Query deleted successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                // Refresh queries after deletion
                getAllQueries();
            } else {
                toast({
                    title: 'Failed to delete query',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error deleting query:', error);
            toast({
                title: 'Error deleting query',
                description: error.message || 'An error occurred.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        getAllQueries();
    }, []); // Fetch queries on initial render only

    return (
        <div>
            <Center>
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                    Total Queries: {total}
                </Text>
            </Center>
            {total === 0 ? (
                <Center mt={8}>
                    <Text>No queries found.</Text>
                </Center>
            ) : (
                <Table variant="striped" colorScheme="teal">
                    <TableCaption>All Queries</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Date</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {queries.map((query) => (
                            <Tr key={query.id}>
                                <Td>{query.name}</Td>
                                <Td>{query.email}</Td>
                                <Td>{new Date(query.date).toLocaleDateString()}</Td>
                                <Td>
                                    <Button colorScheme="red" size="sm" onClick={() => handleDelete(query.id)}>
                                        Delete
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
        </div>
    );
};

export default Notification;
