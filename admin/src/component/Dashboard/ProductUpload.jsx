import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useToast, Input, Button} from '@chakra-ui/react';
import { BASEAPI } from '../../utils/BASEAPI';

const ProductUpload = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [category, setCategory] = useState([]);
    const [previewSrc, setPreviewSrc] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [selectedType, setSelectedType] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState('');
    const [showNextStep, setShowNextStep] = useState(false);
    const [uploadedProductId, setUploadedProductId] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [subcategoryCharge, setSubcategoryCharge] = useState('');
    const [size, setSize] = useState('');
    const [sizeCharge, setSizeCharge] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [isActive, setIsActive] = useState(false);
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

    const handleOriginalPriceChange = (event) => {
        setOriginalPrice(event.target.value);
    };

    const handleDiscountedPriceChange = (event) => {
        setDiscountedPrice(event.target.value);
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
        if (!title || !description || !originalPrice || !discountedPrice) {
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
        formData.append('original_price', originalPrice);
        formData.append('discounted_price', discountedPrice);
        formData.append('is_active', isActive);
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
            console.log(response.data.product);
            const productId = response.data.product.id;

            toast({
                title: 'Product Uploaded successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            setShowNextStep(true);
            setUploadedProductId(productId);

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
        setOriginalPrice('');
        setDiscountedPrice('');
    };

    const handleClearAll = () => {
        setSelectedFiles([]);
        setPreviewSrc([]);
        setUploadError(null);
        setSelectedType('');
        setTitle('');
        setDescription('');
        setOriginalPrice('');
        setDiscountedPrice('');
        setIsActive(true); // Reset the isActive field
        setShowNextStep(false);
        setUploadedProductId('');
        setSubcategory('');
        setSubcategoryCharge('');
        setSize('');
        setSizeCharge('');
        setSubcategories([]);
        setSizes([]);
    }
    const handleRemoveFile = () => {
        setSelectedFiles([]);
        setPreviewSrc([]);
        setUploadError(null);

    };

    const handleAddSubcategory = async () => {
        const subcategoryData = {
            subcategory: subcategory,
            charge: subcategoryCharge,
        };
        toast({
            title: 'Adding...',
            status: 'info',
            duration: 2000,
            isClosable: true,
        });
        try {
            const response = await axios.post(`${BASEAPI}/v1/create-product-subcategory/${uploadedProductId}`, subcategoryData, {
                headers: { Authorization: `${token}` },
            });
            setSubcategories([...subcategories, response.data.data]);
            setSubcategory('');
            setSubcategoryCharge('');
            toast({
                title: 'Subcategory added successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error adding subcategory:', error);
            toast({
                title: 'Failed to add subcategory.',
                description: error.response?.data?.message || 'An error occurred.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleAddSize = async () => {
        const sizeData = {
            size: size,
            charge: sizeCharge,
        };
        toast({
            title: 'Adding...',
            status: 'info',
            duration: 3000,
            isClosable: true,
        });
        try {
            const response = await axios.post(`${BASEAPI}/v1/create-product-size/${uploadedProductId}`, sizeData, {
                headers: { Authorization: `${token}` },
            });
            setSizes([...sizes, response.data.data]);
            setSize('');
            setSizeCharge('');
            toast({
                title: 'Size added successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error adding size:', error);
            toast({
                title: 'Failed to add size.',
                description: error.response?.data?.message || 'An error occurred.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDeleteSubcategory = async (subcategoryId) => {
        try {
            await axios.delete(`${BASEAPI}/v1/delete-product-subcategory/${subcategoryId}`, {
                headers: { Authorization: `${token}` },
            });
            setSubcategories(subcategories.filter(sub => sub.id !== subcategoryId));
            toast({
                title: 'Subcategory deleted successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error deleting subcategory:', error);
            toast({
                title: 'Failed to delete subcategory.',
                description: error.response?.data?.message || 'An error occurred.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDeleteSize = async (sizeId) => {
        try {
            await axios.delete(`${BASEAPI}/v1/delete-product-size/${sizeId}`, {
                headers: { Authorization: `${token}` },
            });
            setSizes(sizes.filter(sz => sz.id !== sizeId));
            toast({
                title: 'Size deleted successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error deleting size:', error);
            toast({
                title: 'Failed to delete size.',
                description: error.response?.data?.message || 'An error occurred.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div className="container mx-auto px-4 md:px-6 max-w-4xl py-12">
            <h1 className="text-3xl font-bold mb-8">Upload New Product</h1>
            <form className="grid gap-6" onSubmit={handleUpload}>
                <div className="grid md:grid-cols-2 gap-6">

                    <div className="grid gap-2">
                        <label className="text-sm font-medium" htmlFor="title">Product Title</label>
                        <Input className="input-class" id="title" type="text" value={title}
                               onChange={handleTitleChange}/>
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium rounded " htmlFor="category">Select Category</label>
                        <select className="input-class" id="category" value={selectedType} onChange={handleTypeChange}>
                            <option value="">Choose a category</option>
                            {category.map((option) => (
                                <option key={option.id} value={option.id}>{option.name}</option>
                            ))}
                        </select>
                    </div>


                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium" htmlFor="description">Product Description</label>
                        <textarea className="border-[1px] rounded border-black p-2" id="description" value={description} onChange={handleDescriptionChange}></textarea>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium" htmlFor="original_price">Original Price</label>
                            <Input className="input-class" id="original_price" type="number" value={originalPrice} onChange={handleOriginalPriceChange} />
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium" htmlFor="discounted_price">Discounted Price</label>
                            <Input className="input-class" id="discounted_price" type="number" value={discountedPrice} onChange={handleDiscountedPriceChange} />
                        </div>
                    </div>
                </div>

                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium" htmlFor="files">Product Images</label>
                        <Input className="input-class" id="files" type="file" multiple onChange={handleFileChange}/>
                    </div>

                    {previewSrc.length > 0 && (
                        <div className="grid grid-cols-3 w-[40%] gap-4">
                            {previewSrc.map((src, index) => (
                                <img key={index} src={src} alt="Preview" className="h-20 w-20 object-cover rounded-md"/>
                            ))}
                        </div>
                    )}

                    {uploadError && (
                        <div className="text-red-500 text-sm">{uploadError}</div>
                    )}
                    <div className="grid gap-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                            />
                            Is Active
                        </label>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <Button type="submit" className="btn-primary">Upload Product</Button>
                        <Button type="button" className="btn-secondary" onClick={handleRemoveFile}>Remove Images
                        </Button>
                    </div>
                </div>
            </form>

            {showNextStep && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Add Subcategory and Size</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium mb-2">Subcategories</h3>
                            <div className="grid gap-2">
                                <Input className="input-class" type="text" placeholder="Subcategory" value={subcategory}
                                       onChange={(e) => setSubcategory(e.target.value)}/>
                                <Input className="input-class" type="number" placeholder="Charge"
                                       value={subcategoryCharge}
                                       onChange={(e) => setSubcategoryCharge(e.target.value)}/>
                                <Button className="btn-primary" onClick={handleAddSubcategory}>Add Subcategory</Button>
                            </div>

                            <ul className="mt-4">
                                {subcategories.map(sub => (
                                    <li key={sub.id} className="flex items-center justify-between mt-2 mb-2">
                                        <span>{sub.subcategory} - ₹{sub.charge}</span>
                                        <Button className="btn-secondary"
                                                onClick={() => handleDeleteSubcategory(sub.id)}>Delete
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium mb-2">Sizes</h3>
                            <div className="grid gap-2">
                                <Input className="input-class" type="text" placeholder="Size" value={size}
                                       onChange={(e) => setSize(e.target.value)}/>
                                <Input className="input-class" type="number" placeholder="Charge" value={sizeCharge}
                                       onChange={(e) => setSizeCharge(e.target.value)}/>
                                <Button className="btn-primary" onClick={handleAddSize}>Add Size</Button>
                            </div>

                            <ul className="mt-4">
                                {sizes.map(sz => (
                                    <li key={sz.id} className="flex items-center justify-between mt-2 mb-2">
                                        <span>{sz.size} - ₹{sz.charge}</span>
                                        <button className="btn-secondary" colorScheme='red'
                                                onClick={() => handleDeleteSize(sz.id)}>Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 mt-6 ">
                        <Button type="button" className="btn-primary" onClick={handleClearAll}>Done</Button>
                    </div>
                </div>


            )}
        </div>
    );
};

export default ProductUpload;
