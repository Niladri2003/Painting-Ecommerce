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

const ContactUs = () => {
    const [contacts, setContacts] = useState([]);
    const [total, setTotal] = useState(0);
    const toast = useToast({ position: "top" });
    const  token  = JSON.parse(localStorage.getItem("token"))

    const getAllContacts = async () => {
        try {
            const response = await axios.get(`${BASEAPI}/v2/get-contact-form`, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            if (response.status !== 200) {
                toast({
                    title: 'Error fetching contacts',
                    description: response.data.error || 'An error occurred.',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
                return;
            }

            toast({
                title: 'All Contacts Fetched Successfully.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });

            setContacts(response.data.data);
            setTotal(response.data.Total);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            toast({
                title: 'Error fetching contacts',
                description: error.message || 'An error occurred.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${BASEAPI}/v2/delete-contact`, {
                headers: {
                    Authorization: `${token}`,
                },
                data: { id },
            });


            if (response.status === 200) {
                toast({
                    title: 'Contact deleted successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                // Refresh contacts after deletion
                await getAllContacts();
            } else {
                toast({
                    title: 'Failed to delete contact',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error deleting contact:', error);
            toast({
                title: 'Error deleting contact',
                description: error.message || 'An error occurred.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        getAllContacts();
    }, []);

    return (
        <div>
            <Center>
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                    Total Contacts: {total}
                </Text>
            </Center>
            {total === 0 ? (
                <Center mt={8}>
                    <Text>No contacts found.</Text>
                </Center>
            ) : (
                <Table variant="striped" colorScheme="teal">
                    <TableCaption>All Contacts</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Phone</Th>
                            <Th>Location</Th>
                            <Th>Date</Th>
                            <Th>Message</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {contacts.map((contact) => (
                            <Tr key={contact.id}>
                                <Td>{contact.name}</Td>
                                <Td>{contact.email}</Td>
                                <Td>{contact.phone}</Td>
                                <Td>{contact.location}</Td>
                                <Td>{new Date(contact.date).toLocaleDateString()}</Td>
                                <Td>{contact.message}</Td>
                                <Td>
                                    <Button colorScheme="red" size="sm" onClick={() => handleDelete(contact.id)}>
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

export default ContactUs;
