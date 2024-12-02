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
