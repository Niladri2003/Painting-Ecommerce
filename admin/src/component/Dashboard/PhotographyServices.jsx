import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
    Box,
    Button,
    Text,
    useToast,
    VStack,
    HStack,
    Progress,
    Alert,
    AlertIcon,
    Image,
    Icon,
    Input,
    Select,
} from '@chakra-ui/react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { BASEAPI } from '../../utils/BASEAPI';

const PhotographyServices = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewSrc, setPreviewSrc] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [selectedType, setSelectedType] = useState('');
    const  token  = JSON.parse(localStorage.getItem("token"))
    const toast = useToast({ position: 'top' });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewSrc(URL.createObjectURL(file));
            setUploadError(null);
        }
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreviewSrc(null);
        setSelectedType('');
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewSrc(URL.createObjectURL(file));
            setUploadError(null);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadError('Please select a file.');
            return;
        }
        if (!selectedType) {
            setUploadError('Please select a type.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('type', selectedType);

        try {
            setUploading(true);
            toast({
                title: 'Uploading...',
                status: 'info',
                duration: 3000,
                isClosable: true,
            });

            const response = await axios.post(`${BASEAPI}/v2/service-upload`, formData, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Service",response)
            toast({
                title: 'Cover Image Uploaded successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            console.log('Upload success:', response);
            handleRemoveFile();
        } catch (error) {
            console.error('Error uploading image:', error);

            if (error.response && error.response.status === 413) {
                toast({
                    title: 'Upload Failed',
                    description: 'Image size is too large. Please upload a smaller image.',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: 'Upload Failed',
                    description: error.response?.data?.message || 'An error occurred.',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={"w-full min-h-screen flex-1"}>
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-2">
            <div className={"rounded-lg flex flex-col gap-2 border p-5"}>
                <Text fontSize="xl" fontWeight="bold">Upload Service Image</Text>
                <Select placeholder="Select type" onChange={handleTypeChange} value={selectedType}>
                    <option value="PreWeddingPhotography">Pre-Wedding Photography</option>
                    <option value="WeddingPhotography">Wedding Photography</option>
                    <option value="CandidPhotography">Candid Photography</option>
                    <option value="MaternityPhotography">Maternity Photography</option>
                    <option value="RiceCeremonyPhotography">Rice Ceremony Photography</option>
                    <option value="BirthdayPhotography">Birthday Photography</option>

                </Select>
                <div className={"grid gap-4"}>
                <Box
                    border="2px dashed"
                    borderColor="gray.300"
                    borderRadius="md"
                    p={4}
                    width="full"
                    textAlign="center"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    position="relative"
                    cursor="pointer"
                >
                    <Input
                        type="file"
                        accept=".webp, .jpg, .png, .jpeg"
                        onChange={handleFileChange}
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        height="100%"
                        opacity="0"
                        cursor="pointer"
                    />
                    {!previewSrc && (
                        <VStack spacing={2}>
                            <Icon as={FaCloudUploadAlt} boxSize={12} color="gray.500" />
                            <Text color="gray.500">Drag and drop a file here, or click to select a file</Text>
                        </VStack>
                    )}
                    {previewSrc && (
                        <Box boxSize="w-full" position="relative">
                            <Image src={previewSrc} alt="Preview" objectFit="cover" boxSize="full" borderRadius="md" />
                        </Box>
                    )}
                </Box>
                {uploadError && (
                    <Alert status="error">
                        <AlertIcon />
                        {uploadError}
                    </Alert>
                )}
                <HStack spacing={4}>
                    <Button
                        colorScheme="teal"
                        onClick={handleUpload}
                        isDisabled={!selectedFile || !selectedType || uploading}
                        isLoading={uploading}
                        loadingText="Uploading"
                    >
                        Upload
                    </Button>
                    {selectedFile && !uploading && (
                        <Button colorScheme="red" onClick={handleRemoveFile}>
                            Remove File
                        </Button>
                    )}
                </HStack>
                {uploading && <Progress size="xs" isIndeterminate width="full" />}
                </div>
            </div>
        </div>
            </div>
    );
};

export default PhotographyServices;
