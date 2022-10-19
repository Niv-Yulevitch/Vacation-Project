# Vacation-Project
Vacation Project - Full Stack Web App (MySQL, Node.js and React)

# Dependencies:
react: ^18.2.0
MySQL with phpMyAdmin

## Import the Database:
1. Open phpMyAdmin - I used XAMPP to run a MariaDB MySQL Server.
2. Import Vacations.sql to a new database named Vacations.
3. Make sure the following MySQL connection settings are correct inside the file config-dev.json located in the Backend:
    - Database Host: localhost
    - Database Name: Vacations
    - Database User: root
    - Database Default Password: (empty)

## Download and Install:
1. Download my project and cd into it using the following commands:
```
git clone https://github.com/Niv-Yulevitch/Vacation-Project.git
cd Vacation-Project
```
2. Install required node modules for the Backend and the Frontend using the following commands:
```
cd Frontend
npm i
cd ../Backend
npm i
```

## Run Instructions:
1. Make sure the MySQL server is up and running – For XAMPP you also need to make sure that Apache and MySQL are running to be able to access phpMyAdmin.
2. First, Run the Backend: (Make sure you’re on the Vacation-Project folder)
```
cd Backend
npm start
```
3. Next, Run the Frontend:
```
cd ../Frontend
npm start
```

## Users Information For Login:
- Admin:
    - Username: Admin
    - Password: admin

- User:
    - Username: BartS
    - Password: 123456



The project should open up on http://localhost:3000/ and load up!

## Screenshots:
#### Login page:
<img width="1436" alt="Login" src="https://user-images.githubusercontent.com/98215470/196795023-e17b66fc-2d1d-4814-97b9-766c6d57ca27.png">
#### Register page:
<img width="1436" alt="Register" src="https://user-images.githubusercontent.com/98215470/196794275-92b04882-bf12-46b8-a080-98c20c11fdaa.png">
#### User home page:
<img width="1436" alt="User Home Page" src="https://user-images.githubusercontent.com/98215470/196794768-0929d6bb-4273-4310-8982-121da88bd5da.png">
#### User filtered vacation on home page:
<img width="1436" alt="User Filtered Vacations" src="https://user-images.githubusercontent.com/98215470/196794787-1a4da8af-8c6d-4937-b67a-8ed52d5a9f11.png">
#### Admin home page:
<img width="1436" alt="Admin Home Page" src="https://user-images.githubusercontent.com/98215470/196794800-4bc04737-f230-48f0-868d-5c6397672147.png">
#### Edit page:
<img width="1436" alt="Edit Page" src="https://user-images.githubusercontent.com/98215470/196794812-b06c9302-a24c-45e2-b1d2-12302d01a10b.png">
#### Add page:
<img width="1436" alt="Add Page" src="https://user-images.githubusercontent.com/98215470/196794821-fa28ce6d-4fce-4d75-a646-d68306e942cd.png">
#### Reports page:
<img width="1436" alt="Reports Page" src="https://user-images.githubusercontent.com/98215470/196794843-3af2a54f-f457-4832-ba8d-d3279c6ece06.png">
