package queries

import (
	"fmt"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/niladri2003/PaintingEcommerce/app/models"
)

// CouponQueries struct for queries from Coupon model.
type CouponQueries struct {
	*sqlx.DB
}

func (q *CouponQueries) CreateCoupon(coupon *models.Coupon) error {
	query := `INSERT INTO coupons (id , coupon_code,validity,discount_percentage,is_active)
				VALUES ($1, $2, $3, $4, $5) RETURNING id`
	_, err := q.Exec(query, coupon.ID, coupon.CouponCode, coupon.Validity, coupon.DiscountPercentage, coupon.IsActive)
	if err != nil {
		fmt.Println("Counpon creation error =>", err)
		return err
	}
	return nil
}

// GetCouponDetailsByCouponCode fetches a coupon by its coupon code.
func (q *CouponQueries) GetCouponDetailsByCouponCode(couponCode string) (*models.Coupon, error) {
	query := `SELECT id, coupon_code, validity, discount_percentage, is_active FROM coupons WHERE coupon_code = $1`
	var coupon models.Coupon
	err := q.Get(&coupon, query, couponCode)
	if err != nil {
		fmt.Println("Error fetching coupon details by coupon code =>", err)
		return nil, err
	}
	return &coupon, nil
}

// GetAllActiveCoupons retrieves all active coupons from the database.
func (q *CouponQueries) GetAllActiveCoupons() ([]*models.Coupon, error) {
	query := `SELECT id, coupon_code, validity, discount_percentage, is_active FROM coupons WHERE is_active = true`
	var coupons []*models.Coupon
	err := q.Select(&coupons, query)
	if err != nil {
		fmt.Println("Error fetching all active coupons =>", err)
		return nil, err
	}
	return coupons, nil
}

// ChangeCouponStatus toggles the status of a coupon (active/inactive).
func (q *CouponQueries) ChangeCouponStatus(id uuid.UUID, isActive bool) error {
	query := `UPDATE coupons SET is_active = $2 WHERE id = $1`
	_, err := q.Exec(query, id, isActive)
	if err != nil {
		fmt.Println("Error changing coupon status =>", err)
		return err
	}
	return nil
}

// DeleteCouponById deletes a coupon from the database by its ID.
func (q *CouponQueries) DeleteCouponById(id uuid.UUID) error {
	query := `DELETE FROM coupons WHERE id = $1`
	_, err := q.Exec(query, id)
	if err != nil {
		fmt.Println("Error deleting coupon by ID =>", err)
		return err
	}
	return nil
}

// Get All Coupons from database
func (q *CouponQueries) GetAllCoupons() ([]*models.Coupon, error) {
	query := `SELECT * FROM coupons`
	var coupons []*models.Coupon
	err := q.Select(&coupons, query)
	if err != nil {
		fmt.Println("Error fetching all  coupons =>", err)
		return nil, err
	}
	return coupons, nil
}
