import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast, Input, Select } from '@chakra-ui/react';
import { BASEAPI } from '../../utils/BASEAPI';

const PhotographyServices = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [category, setCategory] = useState([]);
    const [previewSrc, setPreviewSrc] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [selectedType, setSelectedType] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const token = JSON.parse(localStorage.getItem('token'));
    const toast = useToast({ position: 'top' });

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
        const previewUrls = files.map(file => URL.createObjectURL(file));
        setPreviewSrc(previewUrls);
        setUploadError(null);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const getAllCategories = async () => {
        try {
            const response = await axios.get(`${BASEAPI}/v1/get-all-category`);
            if (response.status !== 200) {
                toast({
                    title: 'Error fetching categories',
                    description: response.message || 'An error occurred.',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }
            setCategory(response.data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast({
                title: 'Error fetching categories',
                description: error.message || 'An error occurred.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        if (!selectedFiles.length) {
            setUploadError('Please select at least one file.');
            return;
        }
        if (!selectedType) {
            setUploadError('Please select a category.');
            return;
        }
        if (!title || !description || !price) {
            setUploadError('Please fill in all the fields.');
            return;
        }

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('images', file);
        });
        formData.append('category_id', selectedType);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);

        try {
            setUploading(true);
            toast({
                title: 'Uploading...',
                status: 'info',
                duration: 3000,
                isClosable: true,
            });

            const response = await axios.post(`${BASEAPI}/v1/create-product`, formData, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response)
            toast({
                title: 'Product Uploaded successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            console.log('Upload success:', response);
            handleRemoveFile();
            handleClearForm();
        } catch (error) {
            console.error('Error uploading product:', error);

            if (error.response && error.response.status === 413) {
                toast({
                    title: 'Upload Failed',
                    description: 'File size is too large. Please upload smaller files.',
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
    const handleClearForm = () => {
        setSelectedFiles([]);
        setPreviewSrc([]);
        setUploadError(null);
        setSelectedType('');
        setTitle('');
        setDescription('');
        setPrice('');
    };

    const handleRemoveFile = () => {
        setSelectedFiles([]);
        setPreviewSrc([]);
        setUploadError(null);
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div className="container mx-auto px-4 md:px-6 max-w-4xl py-12">
            <h1 className="text-3xl font-bold mb-8">Upload New Product</h1>
            <form className="grid gap-6" onSubmit={handleUpload}>
                <div className="grid gap-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="title"
                    >
                        Title
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="title"
                        placeholder="Enter product title"
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div className="grid gap-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px]"
                        id="description"
                        placeholder="Enter product description"
                        value={description}
                        onChange={handleDescriptionChange}
                    ></textarea>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="price"
                        >
                            Price
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="price"
                            step="0.01"
                            placeholder="Enter product price"
                            type="number"
                            value={price}
                            onChange={handlePriceChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <div className="mt-1">
                            <select
                                onChange={handleTypeChange}
                                value={selectedType}
                                id="category"
                                name="category"
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {category.length === 0 ? (
                                    <option>No categories found</option>
                                ) : (
                                    <>
                                        <option>Select a category</option>
                                        {category.map(cat => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </>
                                )}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="grid gap-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="images"
                    >
                        Images
                    </label>
                    <div>
                        <Input
                            onChange={handleFileChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="images"
                            multiple
                            type="file"
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                        onClick={handleRemoveFile}
                    >
                        Cancel
                    </button>
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        type="submit"
                    >
                        Upload Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PhotographyServices;
