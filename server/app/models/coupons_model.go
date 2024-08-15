package models

import (
	"github.com/google/uuid"
	"time"
)

type Coupon struct {
	ID                 uuid.UUID `db:"id" json:"id"`
	CouponCode         string    `db:"coupon_code" json:"coupon_code" `
	Validity           time.Time `db:"validity" json:"validity"`
	DiscountPercentage float64   `db:"discount_percentage" json:"discount_percentage"`
	IsActive           bool      `db:"is_active" json:"is_active"`
}
