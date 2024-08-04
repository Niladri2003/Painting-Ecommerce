package database

import (
	"github.com/cloudinary/cloudinary-go/v2"
	"log"
	"os"
)

func InitCloudinary() *cloudinary.Cloudinary {
	cld, err := cloudinary.NewFromParams(
		os.Getenv("CLOUDINARY_CLOUD_NAME"),
		os.Getenv("CLOUDINARY_API_KEY"),
		os.Getenv("CLOUDINARY_API_SECRET"),
	)
	if err != nil {
		log.Fatalf("Error initializing Cloudinary: %v", err)
	}
	return cld
}
