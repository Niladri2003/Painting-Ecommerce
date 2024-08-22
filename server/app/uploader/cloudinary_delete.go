package uploader

import (
	"context"
	"fmt"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/niladri2003/PaintingEcommerce/platform/database"
	"strings"
)

func DeleteImage(imageURL string) error {
	cld := database.InitCloudinary()

	// extract the public id from the image url
	publicId := extractPublicId(imageURL)
	// Delete the image from Cloudinary
	_, err := cld.Upload.Destroy(context.Background(), uploader.DestroyParams{
		PublicID: publicId,
	})
	if err != nil {
		return fmt.Errorf("error deleting image: %v", err)
	}

	return nil
}

func extractPublicId(imageURL string) string {
	// Assuming the public ID comes after 'upload/' and before the file extension
	// e.g., https://res.cloudinary.com/demo/image/upload/v1613032022/sample.jpg -> sample
	parts := strings.Split(imageURL, "/")
	publicIDWithExtension := parts[len(parts)-1]
	publicID := strings.Split(publicIDWithExtension, ".")[0]

	return publicID
}
