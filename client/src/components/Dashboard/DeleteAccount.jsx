import React, { useState } from "react";
import { Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, useToast } from "@chakra-ui/react";
import { apiConnector } from "../../services/apiConnector.jsx";

const DeleteAccount = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [password, setPassword] = useState("");
    const toast = useToast();

    const handleAccountDeletion = async () => {
        try {
            await apiConnector('POST', '/delete-account', null, null, null, true);
            toast({
                title: "Account Deleted",
                description: "Your account has been deleted successfully.",
                status: "success",
                duration: 2500,
                isClosable: true,
            });
            onClose();
        } catch (error) {
            toast({
                title: "Deletion Failed",
                description: "Failed to delete account. Please check your password and try again.",
                status: "error",
                duration: 2500,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <div className="h-[40rem] flex items-center justify-center">
                <Button
                    colorScheme="red"
                    onClick={onOpen}
                    className="border-2 border-red-500 p-2 rounded-[1rem] bg-red-500 group duration-300 hover:bg-transparent hover:text-red-500 cursor-pointer text-white"
                >
                    Delete Account
                </Button>
            </div>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Account Deletion</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p className="text-gray-700 mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
                        {/* <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        /> */}
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" onClick={onClose} mr={3}>Cancel</Button>
                        <Button
                            colorScheme="red"
                            onClick={handleAccountDeletion}
                        >
                            Delete Account
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            
        </>
    );
};

export default DeleteAccount;
