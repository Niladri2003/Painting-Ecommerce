package utils

import (
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"os"
	"strconv"
	"strings"
	"time"
)

// Tokens struct to describe tokens object.
type Tokens struct {
	Access  string
	Refresh string
}

// GenerateNewTokens func for generate a new Access & Refresh tokens.
func GenerateNewTokens(id string, role string) (*Tokens, error) {
	// Generate JWT Access token.
	accessToken, err := generateNewAccessToken(id, role)
	if err != nil {
		// Return token generation error.
		return nil, err
	}

	// Generate JWT Refresh token.
	refreshToken, err := generateNewRefreshToken()
	if err != nil {
		// Return token generation error.
		return nil, err
	}

	return &Tokens{
		Access:  accessToken,
		Refresh: refreshToken,
	}, nil
}

func generateNewAccessToken(id string, role string) (string, error) {
	// Set secret key from .env file.
	secret := os.Getenv("JWT_SECRET_KEY")

	// Set expires minutes count for secret key from .env file.
	minutesCount, _ := strconv.Atoi(os.Getenv("JWT_SECRET_KEY_EXPIRE_MINUTES_COUNT"))

	// Create a new claims.
	claims := jwt.MapClaims{}

	// Set public claims:
	claims["id"] = id
	claims["role"] = role
	claims["expires"] = time.Now().Add(time.Minute * time.Duration(minutesCount)).Unix()

	// Create a new JWT access token with claims.
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate token.
	t, err := token.SignedString([]byte(secret))
	if err != nil {
		// Return error, it JWT token generation failed.
		return "", err
	}

	return t, nil
}

func generateNewRefreshToken() (string, error) {
	// Create a new SHA256 hash.
	hash := sha256.New()

	// Create a new now date and time string with salt.
	refresh := os.Getenv("JWT_REFRESH_KEY") + time.Now().String()

	// See: https://pkg.go.dev/io#Writer.Write
	_, err := hash.Write([]byte(refresh))
	if err != nil {
		// Return error, it refresh token generation failed.
		return "", err
	}

	// Set expires hours count for refresh key from .env file.
	hoursCount, _ := strconv.Atoi(os.Getenv("JWT_REFRESH_KEY_EXPIRE_HOURS_COUNT"))

	// Set expiration time.
	expireTime := fmt.Sprint(time.Now().Add(time.Hour * time.Duration(hoursCount)).Unix())

	// Create a new refresh token (sha256 string with salt + expire time).
	t := hex.EncodeToString(hash.Sum(nil)) + "." + expireTime

	return t, nil
}

// ParseRefreshToken func for parse second argument from refresh token.
//
//	func ParseRefreshToken(refreshToken string) (int64, error) {
//		return strconv.ParseInt(strings.Split(refreshToken, ".")[1], 0, 64)
//	}
//
// DecodeRefreshToken decodes and validates a refresh token.
func DecodeRefreshToken(token string) (bool, error) {
	// Split the token into hash and expiration time.
	parts := strings.Split(token, ".")
	if len(parts) != 2 {
		return false, errors.New("invalid refresh token format")
	}

	receivedHash := parts[0]
	expireTimeStr := parts[1]

	// Convert the expiration time to an integer.
	expireTimeInt, err := strconv.ParseInt(expireTimeStr, 10, 64)
	if err != nil {
		return false, errors.New("invalid expiration time in refresh token")
	}

	// Check if the token is expired.
	if time.Now().Unix() > expireTimeInt {
		return false, errors.New("refresh token has expired")
	}

	// Recreate the original hash using the JWT_REFRESH_KEY and the expiration time.
	hash := sha256.New()
	refresh := os.Getenv("JWT_REFRESH_KEY") + time.Unix(expireTimeInt, 0).String()

	_, err = hash.Write([]byte(refresh))
	if err != nil {
		return false, errors.New("failed to generate hash for validation")
	}

	expectedHash := hex.EncodeToString(hash.Sum(nil))

	// Compare the received hash with the expected hash.
	if receivedHash != expectedHash {
		return false, errors.New("invalid refresh token")
	}

	// If everything is fine, return true.
	return true, nil
}
