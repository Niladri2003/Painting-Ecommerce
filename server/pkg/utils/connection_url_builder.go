package utils

import (
	"fmt"
	"os"
)

//ConnectionUrlBuilder func for building URL connection

func ConnectionURLBuilder(n string) (string, error) {
	//define URL to connection
	var url string
	//Switch given names.
	switch n {
	case "fiber":
		//URL for fiber connection
		url = fmt.Sprintf("%s:%s", os.Getenv("SERVER_HOST"), os.Getenv("SERVER_PORT"))
	case "redis":
		// URL for Redis connection.
		url = fmt.Sprintf(
			"%s:%s",
			os.Getenv("REDIS_HOST"),
			os.Getenv("REDIS_PORT"),
		)
	default:
		// Return error message.
		return "", fmt.Errorf("connection name '%v' is not supported", n)

	}
	return url, nil
}
