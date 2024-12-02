# Typing Master

Typing Master is a web application designed to help users improve their typing speed and accuracy. Built with React for the frontend and Spring Boot for the backend, the project provides a seamless and interactive experience.

---

## Features
- **User Authentication and Authorization**: Secure login and registration system.
- **Typing Practice**: Interactive typing tests with real-time feedback.
- **Performance Metrics**: Graph-based and number-based metrics to track improvement.
- **Responsive Design**: Fully optimized for both desktop and mobile devices.
- **REST API Integration**: Robust backend API built with Spring Boot.
- **JWT Security**: Secure access to resources using JSON Web Tokens (JWT).

---

## Tech Stack

### Frontend:
- React
- Axios
- React Router
- Styled Components / CSS Modules

### Backend:
- Spring Boot
- Spring Security (with JWT)
- MySQL (or your chosen database)
- Maven

### Tools:
- Docker
- Postman
- Git

---

## Installation

### Prerequisites:
- [Node.js](https://nodejs.org/)
- [Java JDK 17+](https://adoptopenjdk.net/)
- [Docker](https://www.docker.com/) (optional)

---

### Frontend Setup:
1. Navigate to the frontend directory:
   
-cd typing_project_frontend
-Install dependencies: npm install
-Start the development server: npm run dev

2. Backend Setup:
   
 -Navigate to the backend directory: cd Typing-Project
 -Build the Spring Boot application: mvn clean install
 -Run the application: java -jar target/typing-project.jar

---
### Screenshots
Frontend
![Screenshot 2024-12-02 230800](https://github.com/user-attachments/assets/55231959-f926-44f4-bc93-94a8560d93c4)
![Screenshot 2024-12-02 230808](https://github.com/user-attachments/assets/8722e357-84e1-4e42-9d78-8484ac4809ac)
![Screenshot 2024-12-02 230823](https://github.com/user-attachments/assets/5eb7eebe-c9ea-4fba-99b1-124a4c24a86d)
![Screenshot 2024-12-02 230837](https://github.com/user-attachments/assets/2ddc9ff6-936b-45b6-aacd-32bd5e3eaea4)
![Screenshot 2024-12-02 235451](https://github.com/user-attachments/assets/3c7e03ec-b9d8-48d0-ab9b-42d0d02441b8)
![Screenshot 2024-12-02 235655](https://github.com/user-attachments/assets/2dfd52dd-11bd-417d-b98a-68523b116dca)
![Screenshot 2024-12-02 235806](https://github.com/user-attachments/assets/6eb6558a-a348-4d93-a195-2f5dafb4ed33)
![Screenshot 2024-12-03 011436](https://github.com/user-attachments/assets/de40a847-8a33-49d3-9617-6fe19ae47c3a)




---


### API Endpoints
Authentication:
##User
POST /api/auth/register - Register a new user.
 ```bash
     {
        {
            email:" ",
            password:" "
        }
}
 ```


POST /api/auth/login - Login with existing credentials.
 ```bash
     {
        {
            email:" ",
            password:" "
        }
}
 ```
      
POST /api/auth/logout - Logout
 ```bash
     {
        {
            email:" ",
            password:" "
        }
}
 ```

GET api/user/profile 


POST /auth/forgot-password
 ```bash
     {
        {
            email:" "
        }
}
 ```

POST /api/auth/reset-password  
 ```bash
     {
        {
            email:" ",
            password:" "
        }
}
 ``` 

POST api/user/delete   
 ```bash
     {
        {
            email:" ",
            password:" "
        }
}
 ```


##Typing Practice:
GET /api/typing-progress - Fetch typing progress user data.


POST /api/typing-progress 
```bash
    {
        "speed": 45.5,
        "accuracy": 60.2,
        "wordsTyped": 90
}
 ```

 ---

###Deployment
**Docker:
 -Build the Docker image: docker build -t typing-master .
 -Run the container: docker run -p 8080:8080 typing-master

**Render:
 -Push the Docker image to Docker Hub:

  docker tag typing-master your-dockerhub-username/typing-master
  docker push your-dockerhub-username/typing-master

**Deploy the image on Render.
