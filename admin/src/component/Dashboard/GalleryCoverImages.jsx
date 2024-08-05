import React, { useEffect, useState } from 'react';
import { Divider,  Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import ImageCard from '../core/ImageCard.jsx';
import axios from 'axios';
import {BASEAPI} from "../../utils/BASEAPI.js";

const GalleryCoverImages = () => {
    const [coverImages, setCoverImages] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const[BirthdayImage, setBirthdayImage] = useState([]);
    const[CandidImage, setCandidImage] = useState([]);
    const[MaternityImage, setMaternityImage] = useState([]);
    const[PreweddingImage, setPreweddingImage] = useState([]);
    const[WeddingImage, setWeddingImage] = useState([]);
    const[RiceceremonyImage, setRiceceremonyImage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const  token  = JSON.parse(localStorage.getItem("token"))

    const fetchImages = async () => {
        try {
            const response = await axios.get(`${BASEAPI}/v2/get-all-images`, {

            });
            const data = response.data;
            setCoverImages(data.cover_images);
            setGalleryImages(data.gallery_images);
            setBirthdayImage(data.BirthdayPhotography);
            setRiceceremonyImage(data.RiceCeremonyPhotography);
            setCandidImage(data.CandidPhotography);
            setMaternityImage(data.MaternityPhotography);
            setPreweddingImage(data.PreWeddingPhotography);
            setWeddingImage(data.WeddingPhotography);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch images');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, [token]); // Trigger fetch on token change

    const handleDeleteImage = async () => {
        try {

            // Trigger refetch of images after deletion
            await fetchImages();

            // Optionally, you can handle UI updates or state changes here after successful deletion
        } catch (error) {
            console.error('Error deleting image:', error);
            // Handle error if needed
        }
    };

    if (loading) {
        return <Spinner size="xl"  />;
    }

    if (error) {
        return (
            <Alert status="error">
                <AlertIcon />
                {error}
            </Alert>
        );
    }

    return (
        <div
            className="w-full h-full flex lg:flex-col flex-col lg:gap-10 gap-10 lg:justify-between lg:items-center justify-between items-center lg:mt-0 ">
            <div className="w-full  h-full p-2   lg:mb-0">
                <p className="lg:text-2xl text-lg font-serif mb-2">Cover Images</p>
                <Divider/>
                <div
                    className="grid lg:grid-cols-6 grid-cols-2 lg:items-start items-center lg:gap-4 gap-1 lg:justify-start justify-between w-full h-full lg:mt-2">
                    {coverImages.length === 0 ? (
                        <p className="lg:text-2xl text-sm font-serif mb-2">No Cover Images Available</p>
                    ) : (
                        coverImages.map((src, index) => (
                            <ImageCard key={index} src={src} alt={`Cover Image ${index + 1}`}
                                       onDelete={() => handleDeleteImage()}/>
                        ))
                    )}
                </div>
            </div>

            <div className="w-full h-full p-2 pb-2 ">
                <p className="lg:text-2xl text-lg font-serif mb-2">Gallery Images</p>
                <Divider/>
                <div
                    className="grid lg:grid-cols-6 grid-cols-2 items-start lg:gap-4 gap-2 lg:justify-start justify-between w-full h-full mt-2">
                    {galleryImages.length === 0 ? (
                        <p className="lg:text-2xl text-sm font-serif mb-2">No Gallery Images Available</p>
                    ) : (
                        galleryImages.map((src, index) => (
                            <ImageCard key={index} src={src} alt={`Gallery Image ${index + 1}`}
                                       onDelete={() => handleDeleteImage(src, `Gallery Image ${index + 1}`)}/>
                        ))
                    )}
                </div>
            </div>
            <div className="w-full h-full p-2 pb-2 ">
                <p className="lg:text-2xl text-lg font-serif mb-2">PreWedding Images</p>
                <Divider/>
                <div
                    className="grid lg:grid-cols-6 grid-cols-2 items-start lg:gap-4 gap-2 lg:justify-start justify-between w-full h-full mt-2">
                    {(!PreweddingImage || PreweddingImage.length === 0) ? (
                        <p className="lg:text-2xl text-sm font-serif mb-2">No Prewedding Images Available</p>
                    ) : (
                        PreweddingImage.map((src, index) => (
                            <ImageCard key={index} src={src} alt={`Pre Image ${index + 1}`}
                                       onDelete={() => handleDeleteImage()}/>
                        ))
                    )}
                </div>
            </div>
            <div className="w-full h-full p-2 pb-2 ">
                <p className="lg:text-2xl text-lg font-serif mb-2">Wedding Images</p>
                <Divider/>
                <div
                    className="grid lg:grid-cols-6 grid-cols-2 items-start lg:gap-4 gap-2 lg:justify-start justify-between w-full h-full mt-2">
                    {(!WeddingImage || WeddingImage.length === 0) ? (
                        <p className="lg:text-2xl text-sm font-serif mb-2">No Wedding Images Available</p>
                    ) : (
                        WeddingImage.map((src, index) => (
                            <ImageCard key={index} src={src} alt={`Wedding Image ${index + 1}`}
                                       onDelete={() => handleDeleteImage()}/>
                        ))
                    )}
                </div>
            </div>
            <div className="w-full h-full p-2 pb-2 ">
                <p className="lg:text-2xl text-lg font-serif mb-2">Maternity Images</p>
                <Divider/>
                <div
                    className="grid lg:grid-cols-6 grid-cols-2 items-start lg:gap-4 gap-2 lg:justify-start justify-between w-full h-full mt-2">
                    {(!MaternityImage || MaternityImage.length === 0) ? (
                        <p className="lg:text-2xl text-sm font-serif mb-2">No Maternity Images Available</p>
                    ) : (
                        MaternityImage.map((src, index) => (
                            <ImageCard key={index} src={src} alt={`Maternity Image ${index + 1}`}
                                       onDelete={() => handleDeleteImage()}/>
                        ))
                    )}
                </div>
            </div>
            <div className="w-full h-full p-2 pb-2 ">
                <p className="lg:text-2xl text-lg font-serif mb-2">Candid Images</p>
                <Divider/>
                <div
                    className="grid lg:grid-cols-6 grid-cols-2 items-start lg:gap-4 gap-2 lg:justify-start justify-between w-full h-full mt-2">
                    {(!CandidImage || CandidImage.length === 0) ? (
                        <p className="lg:text-2xl text-sm font-serif mb-2">No Candid Images Available</p>
                    ) : (
                        CandidImage.map((src, index) => (
                            <ImageCard key={index} src={src} alt={`Candid Image ${index + 1}`}
                                       onDelete={() => handleDeleteImage()}/>
                        ))
                    )}
                </div>
            </div>
            <div className="w-full h-full p-2 pb-2 ">
                <p className="lg:text-2xl text-lg font-serif mb-2">Rice Ceremony Images</p>
                <Divider/>
                <div
                    className="grid lg:grid-cols-6 grid-cols-2 items-start lg:gap-4 gap-2 lg:justify-start justify-between w-full h-full mt-2">
                    {(!RiceceremonyImage || RiceceremonyImage.length === 0) ? (
                        <p className="lg:text-2xl text-sm font-serif mb-2">No Maternity Images Available</p>
                    ) : (
                        RiceceremonyImage.map((src, index) => (
                            <ImageCard key={index} src={src} alt={`RiceCeremony Image ${index + 1}`}
                                       onDelete={() => handleDeleteImage()}/>
                        ))
                    )}
                </div>
            </div>
            <div className="w-full h-full p-2 pb-2 ">
                <p className="lg:text-2xl text-lg font-serif mb-2">Birthday Images</p>
                <Divider/>
                <div
                    className="grid lg:grid-cols-6 grid-cols-2 items-start lg:gap-4 gap-2 lg:justify-start justify-between w-full h-full mt-2">
                    {(!BirthdayImage || BirthdayImage.length === 0) ? (
                        <p className="lg:text-2xl text-sm font-serif mb-2">No Maternity Images Available</p>
                    ) : (
                        BirthdayImage.map((src, index) => (
                            <ImageCard key={index} src={src} alt={`Birthday Image ${index + 1}`}
                                       onDelete={() => handleDeleteImage()}/>
                        ))
                    )}
                </div>
            </div>
        </div>

    );
};

export default GalleryCoverImages;
