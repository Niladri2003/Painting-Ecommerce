package cache

import (
	"github.com/niladri2003/PaintingEcommerce/pkg/utils"
	"github.com/redis/go-redis/v9"
	"os"
	"strconv"
)

func RedisConnection() (*redis.Client, error) {
	dbNumber, _ := strconv.Atoi(os.Getenv("REDIS_DB_NUMBER"))

	redisConnURL, err := utils.ConnectionURLBuilder("redis")
	if err != nil {
		return nil, err
	}
	//Set Redis options
	options := &redis.Options{
		Addr:     redisConnURL,
		Password: os.Getenv("REDIS_PASSWORD"),
		DB:       dbNumber,
	}
	return redis.NewClient(options), nil
}
