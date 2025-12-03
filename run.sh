#!/bin/bash


GREEN="\e[32m"
YELLOW="\e[33m"
BLUE="\e[34m"
RESET="\e[0m"

while true; do
    clear
    echo -e "${BLUE}=============================="
    echo -e "    Docker Compose Runner"
    echo -e "==============================${RESET}"

    echo -e "${YELLOW}Choose an option:${RESET}"
    echo "1) Clean & Run Development Mode"
    echo "2) Run Production Mode"
    echo "3) Stop & Clean All Containers"
    echo "4) Exit"
    echo ""

    read -p "Enter your choice [1-4]: " choice

    case $choice in
        1)
            echo -e "${GREEN}Cleaning and starting DEV mode...${RESET}"
            docker compose down --volumes --remove-orphans
            docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
            read -p "Press Enter to continue..."
            ;;
        2)
            echo -e "${GREEN}Starting PRODUCTION mode...${RESET}"
            docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
            echo -e "${GREEN}Production containers are running in detached mode.${RESET}"
            read -p "Press Enter to continue..."
            ;;
        3)
            echo -e "${GREEN}Stopping and cleaning all containers...${RESET}"
            docker compose down --volumes --remove-orphans
            read -p "Press Enter to continue..."
            ;;
        4)
            echo "Exiting..."
            exit 0
            ;;
        *)
            echo "Invalid choice! Please enter a number between 1 and 4."
            read -p "Press Enter to continue..."
            ;;
    esac
done
