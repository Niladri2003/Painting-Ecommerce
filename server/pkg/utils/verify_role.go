package utils

import "fmt"

// Verify Role func for verifying a given role
func VerifyRole(role string) (string, error) {
	switch role {
	case "admin":
	case "user":
	default:
		return "", fmt.Errorf("role '%v' does not exist ")
	}
	return role, nil
}
