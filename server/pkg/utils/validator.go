package utils

import (
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

// NewValidator creates a new validator for model fields.
func NewValidator() *validator.Validate {
	validate := validator.New()

	// Custom validation for uuid.UUID fields.
	_ = validate.RegisterValidation("uuid", func(fl validator.FieldLevel) bool {
		field := fl.Field().String()
		if _, err := uuid.Parse(field); err != nil {
			return false // Return false if UUID parsing fails
		}
		return true
	})

	return validate
}

// ValidatorErrors func for showing validation errors for each invalid field.
func ValidatorErrors(err error) map[string]string {
	fields := map[string]string{}

	// Make error message for each invalid field.
	for _, err := range err.(validator.ValidationErrors) {
		fields[err.Field()] = err.Error()
	}

	return fields
}
