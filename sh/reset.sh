#!/bin/bash

# Exit immediately if any command fails
set -e

GREEN='\033[1;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

cd ../
pwd

# Function to clear containers, volumes, and networks
clear_containers() {
  echo -e "${GREEN}Stopping and removing containers...${NC}"
  docker compose down
  docker system prune --all -f
  docker volume prune -f
  docker network prune -f
}

# Function to start development dependencies
up_dev_containers() {
  echo -e "${GREEN}Starting development containers...${NC}"
  make up-containers
}

install_dependencies() {
    echo -e "${GREEN}Installing Python packages...${NC}"
    make install
}

# Function to run other project-specific commands
run_project_commands() {
  echo -e "${GREEN}Running migrations...${NC}"

  make migrations
  make migrate

  echo -e "${GREEN}Starting development server...${NC}"

  make runserver
}

# Prompt for confirmation
read -p "This will reset the project, including stopping and removing containers. Are you sure? (y/N): " confirmation
if [ "$confirmation" != "y" ] && [ "$confirmation" != "Y" ]; then
  echo "Reset aborted."
  exit 1
fi

# Call functions to perform the reset
clear_containers
install_dependencies
up_dev_containers
run_project_commands

echo -e "${GREEN}Project has been reset successfully.${NC}"

echo -e "${GREEN}run make superuser to create a superuser.${NC}"


