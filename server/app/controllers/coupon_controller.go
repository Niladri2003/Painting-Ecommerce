package controllers

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/niladri2003/PaintingEcommerce/app/models"
	"github.com/niladri2003/PaintingEcommerce/pkg/middleware"
	"github.com/niladri2003/PaintingEcommerce/platform/database"
	"net/http"
	"strconv"
	"time"
)

func CreateCoupon(c *fiber.Ctx) error {
	var input struct {
		CouponCode         string `json:"coupon_code"`
		Validity           string `json:"validity"`
		DiscountPercentage string `json:"discount_percentage"`
		IsActive           bool   `json:"is_active"`
	}
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	if claims.UserRole != "admin" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "only users can create order"})
	}
	// Parse the request body into the input struct
	if err := c.BodyParser(&input); err != nil {
		fmt.Println(err)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "cannot parse JSON"})
	}

	// Parse the validity date string to time.Time
	validity, err := time.Parse("02-01-2006", input.Validity) // Adjust format as needed
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "invalid date format"})
	}
	// Convert price to float
	priceValue, err := strconv.ParseFloat(input.DiscountPercentage, 64)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid price format"})
	}

	// Create a new Coupon struct
	coupon := models.Coupon{
		ID:                 uuid.New(),
		CouponCode:         input.CouponCode,
		Validity:           validity,
		DiscountPercentage: priceValue,
		IsActive:           input.IsActive,
	}
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}
	if err := db.CreateCoupon(&coupon); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "coupon creation error"})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"error": false, "data": coupon, "msg": "coupon created"})
}
func DeleteCoupon(c *fiber.Ctx) error {
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	if claims.UserRole != "admin" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "only users can create order"})
	}
	//Get Coupon Code from params
	// Get the order ID from the URL parameters
	couponIDParam := c.Params("couponID")
	couponID, err := uuid.Parse(couponIDParam)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": true, "msg": "Invalid subcategory ID"})
	}
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}
	if err := db.DeleteCouponById(couponID); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "coupon deletion error"})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"error": false, "msg": "coupon deleted"})

}
func GetAllCoupon(c *fiber.Ctx) error {
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	if claims.UserRole != "admin" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "only users can create order"})
	}
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}
	coupons, err := db.GetAllCoupons()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "coupon fetching error"})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"error": false, "data": coupons})
}
func ChangeCouponStatus(c *fiber.Ctx) error {
	type isActiveRequest struct {
		IsActive string `json:"is_active"`
	}
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	if claims.UserRole != "admin" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "only users can create order"})
	}
	couponIDParam := c.Params("couponID")
	couponID, err := uuid.Parse(couponIDParam)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "invalid coupon ID"})
	}
	var request isActiveRequest
	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "cannot parse JSON"})
	}

	// Convert the is_active string to boolean
	isActiveBool, err := strconv.ParseBool(request.IsActive)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid is_active value"})
	}
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}
	if err := db.ChangeCouponStatus(couponID, isActiveBool); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "coupon creation error"})
	}
	return c.Status(200).JSON(fiber.Map{"error": false, "msg": "coupon updated"})
}
func CouponApply(c *fiber.Ctx) error {
	type CouponCode struct {
		Code string `json:"code"`
	}
	var couponCode CouponCode
	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	if claims.UserRole != "user" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "only users can create order"})
	}
	if err := c.BodyParser(&couponCode); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "cannot parse JSON"})
	}
	if len(couponCode.Code) > 50 {
		return c.Status(400).JSON(fiber.Map{"error": "coupon code too long"})
	}
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}
	couponDetails, err := db.GetCouponDetailsByCouponCode(couponCode.Code)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}
	// check coupon active status
	if !couponDetails.IsActive {
		return c.Status(400).JSON(fiber.Map{"error": true, "msg": "coupon is deactivated"})
	}
	// Check if coupon validity date has passed
	if time.Now().After(couponDetails.Validity) {
		return c.Status(400).JSON(fiber.Map{"error": true, "msg": "coupon has expired"})
	}
	// Get cart details by user ID
	cartDetails, err := db.GetCartByUserID(claims.UserID)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": true, "msg": "Failed to get cart details"})
	}
	//Adding coupon details to cart
	cartDetails.IsCouponCodeApplied = true
	cartDetails.CouponCode = couponCode.Code
	cartDetails.Discountpercentage = couponDetails.DiscountPercentage
	if err := db.ApplyCouponTocart(&cartDetails); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": true, "msg": "Error while applying coupon"})
	}

	return c.Status(200).JSON(fiber.Map{"success": true, "msg": "coupon applied successfully", "discount": couponDetails.DiscountPercentage})
}
func RemoveCoupon(c *fiber.Ctx) error {

	claims, err := middleware.ExtractTokenMetadata(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": true, "msg": "token invalid"})
	}

	if time.Now().Unix() > claims.Expires {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "token expired"})
	}

	if claims.UserRole != "user" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": true, "msg": "only users can create order"})
	}
	db, err := database.OpenDbConnection()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": true, "msg": err.Error()})
	}
	// Get cart details by user ID
	cartDetails, err := db.GetCartByUserID(claims.UserID)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": true, "msg": "Failed to get cart details"})
	}
	// Removing coupon details from cart
	cartDetails.IsCouponCodeApplied = false
	cartDetails.CouponCode = ""
	cartDetails.Discountpercentage = 0.0
	if err := db.ApplyCouponTocart(&cartDetails); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": true, "msg": "Error while applying coupon"})
	}
	return c.Status(200).JSON(fiber.Map{"success": true, "msg": "coupon removed successfully"})

}
