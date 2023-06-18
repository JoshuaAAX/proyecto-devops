# ```project-devops```

<h3 align="left"> Installation :</h3> 
be located in the main folder and run the command:  

```
npm install
```
install packages in frontend-app folder:

```
npm run build
```

```
npm install
```


<h3 align="left"> Run with Docker:  </h3>

builds Docker image from a Dockerfile:  

```
docker build -t devops-proyect .
```

creates running container from image (devops-proyect):

```
docker run -p 7000:7000 devops-proyect
```
# ```Design: CI/CD pipeline architecture```
*Technologies*  
- Slack
- Git/Github
- Github Actions
- Jest
- Selenium
- Docker
- Kubernetes
![image](https://github.com/JoshuaAAX/proyecto-devops/assets/65038415/bc16067e-1135-4ba3-a098-f33d1674e68a)

In our project, we implemented a highly efficient and automated CI/CD pipeline architecture to streamline the development, testing, and continuous deployment of our applications. We utilized several popular technologies to achieve this.

To start off, we leveraged React, a widely-used JavaScript library for building interactive user interfaces. React enabled us to create reusable components and construct a responsive and modern UI for our applications.

Next, we employed Express and Node.js to develop our server layer. Express is a fast and minimalist web framework that allowed us to easily create RESTful APIs for our applications. Node.js provided us with an efficient runtime environment to execute the server and manage client requests and responses.

For storing and managing our data, we utilized PostgreSQL, a reliable and scalable relational database. PostgreSQL enabled us to securely and efficiently store and manipulate data, while providing the flexibility needed to adapt to changing requirements of our applications.

To perform comprehensive automated testing, we implemented Jest and Selenium. Jest is a JavaScript testing framework that allowed us to write and execute unit and integration tests easily and efficiently. Selenium, on the other hand, was a tool we used for functional and navigation testing of our web applications, ensuring that they functioned correctly across different browsers and environments.

To automate the entire CI/CD process, we leveraged GitHub Actions, a cloud-based continuous integration and delivery platform. GitHub Actions allowed us to define custom workflows that automatically triggered when changes were made to our code repository on GitHub. These workflows could include tasks such as automated testing, artifact compilation, and deployment to testing or production environments.

To ensure our applications ran consistently across different environments, we utilized Docker and Kubernetes. Docker allowed us to package our applications and their dependencies into lightweight and portable containers. This facilitated the deployment and execution of our applications in any Docker-compatible environment. Kubernetes, on the other hand, was a container orchestration platform that enabled us to efficiently manage and scale our containers, ensuring optimal performance and high availability of our applications.

We used Slack for notifications and prometheus for monitoring. 
You can check prometheus in this link:
http://24.199.120.226:30000/graph

Here's our slack channel where we notify all the important things 


<img src="https://i.imgur.com/jmXmmUR.jpg" alt="image" width="100">


# ```App Design```
![image](https://github.com/JoshuaAAX/proyecto-devops/assets/65038415/e50a673a-ada3-49da-acaa-9a2b800e538f)
