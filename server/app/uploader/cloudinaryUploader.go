package uploader

import (
	"context"
	"fmt"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/niladri2003/PaintingEcommerce/platform/database"
	"os"
)

func UploadImage(filePath string) (string, error) {
	cld := database.InitCloudinary()
	// Ensure the file is cleaned up after the function returns
	defer func() {
		if err := cleanupFile(filePath); err != nil {
			fmt.Printf("Error cleaning up file: %v\n", err)
		}
	}()

	// Upload the image
	resp, err := cld.Upload.Upload(context.Background(), filePath, uploader.UploadParams{
		Folder: "paintings_image", // Optional: specify a folder
	})
	if err != nil {
		return "", fmt.Errorf("error uploading image: %v", err)
	}

	return resp.SecureURL, nil
}
func cleanupFile(filePath string) error {
	if err := os.Remove(filePath); err != nil {
		return fmt.Errorf("error removing file %s: %w", filePath, err)
	}
	return nil
}
