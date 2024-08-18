package utils

import "golang.org/x/crypto/bcrypt"

// NormalizePassword func for a returning the users input as a byte slice.
func NormalizePassword(p string) []byte {
	return []byte(p)
}

func GeneratePassword(p string) string {
	//Normalize password from string to byte
	bytePassword := NormalizePassword(p)

	// MinCost is just an integer constant provided by the bcrypt package
	// along with DefaultCost & MaxCost. The cost can be any value
	hash, err := bcrypt.GenerateFromPassword(bytePassword, bcrypt.MinCost) //the MinCost (4).
	if err != nil {
		return err.Error()
	}
	return string(hash)
}

// ComparePasswords func for a comparing password.
//func ComparePasswords(hashedPwd, inputPwd string) bool {
//	// Since we'll be getting the hashed password from the DB it will be a string,
//	// so we'll need to convert it to a byte slice.
//	byteHash := []byte(hashedPwd)
//	byteInput := []byte(inputPwd)
//
//	// Return result.
//	return bcrypt.CompareHashAndPassword(byteHash, byteInput) == nil
//}
