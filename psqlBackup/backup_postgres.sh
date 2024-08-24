#!/bin/bash

# Variables
CONTAINER_NAME="cgapp-postgres"
BACKUP_DIR="/home/ubuntu/SQLbackup"
BACKUP_FILE="$BACKUP_DIR/postgres_backup_$(date +'%Y%m%d%H%M%S').sql"
GIT_REPO_DIR="/home/ubuntu/Painting-Ecommerce"
GIT_BACKUP_DIR="$GIT_REPO_DIR/psqlBackup"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Take the backup
sudo docker exec $CONTAINER_NAME pg_dump -U postgres postgres > $BACKUP_FILE

# Copy backup to EC2 instance
scp $BACKUP_FILE user@ec2-instance:/home/ubuntu/Painting-Ecommerce/psqlBackup

# Copy the backup to the local Git repo
cp $BACKUP_FILE $GIT_BACKUP_DIR

# Navigate to the Git repo
cd $GIT_REPO_DIR

# Commit and push the backup to GitHub
git add .
git commit -m "Automated backup on $(date +'%Y-%m-%d %H:%M:%S')"
git push origin main
