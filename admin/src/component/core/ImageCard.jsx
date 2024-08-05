import React, { useState } from 'react';
import { Box, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {BASEAPI} from "../../utils/BASEAPI.js";

const ImageCard = ({ src, alt, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const toast = useToast({ position: 'top' });
    const  token  = JSON.parse(localStorage.getItem("token"))

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleDeleteImage = async () => {
        try {
            // Replace with your actual authentication token

            // Extract image key from src
            const imageKey = src.split('uploads/')[1];
            const formattedImageKey = `uploads/${imageKey}`;

            setDeleting(true)
            toast({
                title: 'Deleting...',
                status: 'info',
                duration: 2000,
                isClosable: true,
            });
            // Determine the image type based on alt text
            let imageType = '';
            if (alt.includes('Gallery')) {
                imageType = 'Gallery';
            } else if (alt.includes('Cover')) {
                imageType = 'Cover';
            } else if (alt.includes('Wedding')) {
                imageType = 'Wedding';
            } else if (alt.includes('Pre')) {
                imageType = 'PreWedding';
            } else if (alt.includes('Candid')) {
                imageType = 'Candid';
            } else if (alt.includes('Maternity')) {
                imageType = 'Maternity';
            } else if (alt.includes('RiceCeremony')) {
                imageType = 'RiceCeremony';
            } else if (alt.includes('Birthday')) {
                imageType = 'Birthday';
            }
            // Make DELETE request to delete endpoint
            const response = await axios.delete(`${BASEAPI}/v2/delete`, {
                headers: {
                    Authorization: `${token}`,
                },
                data: {
                    image_key: formattedImageKey,
                    image_type: imageType, // Checking if image is Gallery Image or Cover Image
                },
            });
            console.log("Delete Response=>",response.status)
            // Show success toast
            if (response.status === 200) {
                toast({
                    title: 'Image deleted.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                // Close the modal after deletion
                setIsOpen(false);


                // UI changes here after successful deletion
                onDelete();
            }



        } catch (error) {
            // Show error toast
            toast({
                title: 'Error deleting image.',
                description: error.message || 'An error occurred.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            }
            );
            console.error('Error deleting image:', error);
        }finally {
            setDeleting(false)
        }
    };


    return (
        <>
            <div
                className="border border-gray-300 rounded-lg overflow-hidden w-full h-full flex justify-center items-center bg-gray-100 cursor-pointer"
                onClick={handleOpen}
            >
                <Image
                    src={src}
                    alt={alt}
                    objectFit="cover"
                    layout={"fill"}
                    width="100%"
                    height="100%"
                />
            </div>

            <Modal isOpen={isOpen} onClose={handleClose} size="full">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{alt}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image src={src} alt={alt} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleDeleteImage} disabled={deleting} isLoading={deleting}>
                            Delete
                        </Button>
                        <Button colorScheme="blue" mr={3} onClick={handleClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ImageCard;
