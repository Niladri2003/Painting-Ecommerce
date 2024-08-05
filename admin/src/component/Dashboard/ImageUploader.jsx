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
} from '@chakra-ui/react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import {BASEAPI} from "../../utils/BASEAPI.js";

const ImageUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewSrc, setPreviewSrc] = useState(null);
    const [selectedGalleryFile, setSelectedGalleryFile] = useState(null);
    const [previewGallerySrc, setGalleryPreviewSrc] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadGalleryError, setGalleryUploadError] = useState(null);
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
    const handleGalleryFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedGalleryFile(file);
            setGalleryPreviewSrc(URL.createObjectURL(file));
            setGalleryUploadError(null);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreviewSrc(null);
    };
    const handleGalleryRemoveFile = () => {
        setSelectedGalleryFile(null);
        setGalleryPreviewSrc(null);
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
    const handleGalleryDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedGalleryFile(file);
            setGalleryPreviewSrc(URL.createObjectURL(file));
            setGalleryUploadError(null);
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

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            setUploading(true);
            toast({
                title: 'Uploading...',
                status: 'info',
                duration: 3000,
                isClosable: true,
            });

            const response = await axios.post(`${BASEAPI}/v2/cover-upload`, formData, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Show success toast
            toast({
                title: 'Cover Image Uploaded successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            console.log('Upload success:', response.data);
            handleRemoveFile();
        } catch (error) {
            console.error('Error uploading image:', error.response.data.message);
            toast({
                title: error.response.data.error,
                description: `Image Dimension mismatch`|| 'An error occurred.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });

            console.error('Error uploading image:', error.response.data.error);
            setUploadError(error.response.data.error);
        } finally {
            setUploading(false);
        }
    };
    const handleGalleryUpload = async () => {
        if (!selectedGalleryFile) {
            setGalleryUploadError('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedGalleryFile);

        try {
            setUploading(true);
            toast({
                title: 'Uploading...',
                status: 'info',
                duration: 3000,
                isClosable: true,
            });

            const response = await axios.post(`${BASEAPI}/v2/gallery-upload`, formData, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Show success toast
            toast({
                title: 'Gallery Image Uploaded successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            console.log('Upload success:', response.data);
            handleGalleryRemoveFile();
        } catch (error) {
            toast({
                title: 'Error while uploading Gallery Image',
                description: error.message || 'An error occurred.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });

            console.error('Error uploading image:', error);
            setGalleryUploadError('Failed to Gallery upload image.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={"w-full min-h-screen flex-1"}>

            {/*Cover Image Uploader*/}
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-2">
                <div className={"rounded-lg border p-5"}>
                    <div className={"lex flex-col space-y-1.5 p-6"}>
                    <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                        Cover Image Uploader
                    </h3>
                    <p className="text-sm text-muted-foreground">Drag and drop or select a file to upload to your
                        gallery.</p>
                    </div>
                    <div className={"grid gap-4"}>
                    <Box
                        border="2px dashed"
                        borderColor="gray.300"
                        borderRadius="md"
                        p={8}
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
                                <Icon as={FaCloudUploadAlt} boxSize={12} color="gray.500"/>
                                <Text color="gray.500">Drag and drop a file here, or click to select a file</Text>
                            </VStack>
                        )}
                        {previewSrc && (
                            <Box boxSize="w-full" position="relative">
                                <Image src={previewSrc} alt="Preview" objectFit="cover" boxSize="full"
                                       borderRadius="md"/>
                            </Box>
                        )}
                    </Box>

                    {uploadError && (
                        <Alert status="error">
                            <AlertIcon/>
                            {uploadError}
                        </Alert>
                    )}
                    <HStack spacing={4}>
                        <Button
                            colorScheme="teal"
                            onClick={handleUpload}
                            isDisabled={!selectedFile || uploading}
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
                    {uploading && <Progress size="xs" isIndeterminate width="full"/>}
                    </div>
                </div>

                {/*Gallery Image Uploader*/}
                <div className={"rounded-lg border p-5"}>
                    <div className={"lex flex-col space-y-1.5 p-6"}>
                        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                            Gallery Image Uploader
                        </h3>
                        <p className="text-sm text-muted-foreground">Drag and drop or select a file to upload to your
                            cover.</p>
                    </div>
                    <div className={"grid gap-4"}>
                    <Box
                        border="2px dashed"
                        borderColor="gray.300"
                        borderRadius="md"
                        p={8}
                        width="full"
                        textAlign="center"
                        onDrop={handleGalleryDrop}
                        onDragOver={handleDragOver}
                        position="relative"
                        cursor="pointer"
                    >
                        <Input
                            type="file"
                            accept=".webp, .jpg, .png, .jpeg"
                            onChange={handleGalleryFileChange}
                            position="absolute"
                            top="0"
                            left="0"
                            width="100%"
                            height="100%"
                            opacity="0"
                            cursor="pointer"
                        />
                        {!previewGallerySrc && (
                            <VStack spacing={2}>
                                <Icon as={FaCloudUploadAlt} boxSize={12} color="gray.500"/>
                                <Text color="gray.500">Drag and drop a file here, or click to select a file</Text>
                            </VStack>
                        )}
                        {previewGallerySrc && (
                            <Box boxSize="w-full" position="relative">
                                <Image src={previewGallerySrc} alt="Preview" objectFit="cover" boxSize="full"
                                       borderRadius="md"/>
                            </Box>
                        )}
                    </Box>
                    {uploadGalleryError && (
                        <Alert status="error">
                            <AlertIcon/>
                            {uploadGalleryError}
                        </Alert>
                    )}
                    <HStack spacing={4}>
                        <Button
                            colorScheme="teal"
                            onClick={handleGalleryUpload}
                            isDisabled={!selectedGalleryFile || uploading}
                            isLoading={uploading}
                            loadingText="Uploading"
                        >
                            Upload
                        </Button>
                        {selectedGalleryFile && !uploading && (
                            <Button colorScheme="red" onClick={handleGalleryRemoveFile}>
                                Remove File
                            </Button>
                        )}
                    </HStack>
                    {uploading && <Progress size="xs" isIndeterminate width="full"/>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;
