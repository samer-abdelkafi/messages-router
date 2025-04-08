# Messages Router

## Description
**Messages Router** is an application built using Spring-boot, Spring-Integration DSL and Spring Data JPA, to efficiently route messages through a modern back-end system. 
This application uses Java as its server-side platform and Angular on the front-end to provide a rich and responsive user interface.

The aim of the project is to provide a sample project, storing, and routing messages with flexibility and ease of integration.


Below is the updated **README** file with a graph representation to illustrate the routing process from the input queue to the destination queues:


# Messages Router

## Description
**Messages Router** is a sample application built using **Spring Boot**, **Spring Integration DSL**, and **Spring Data JPA**, designed to efficiently route and store messages in a modern back-end system. It leverages **Java** as the server-side platform and **Angular** as the front-end framework to provide a rich, responsive, and extensible user interface.

The purpose of this project is to serve as an example of message routing and processing, offering flexibility, scalability, and ease of integration for enterprise applications.

---

## Technologies Used

### Back-End
- **Java SDK 17**: The programming language and platform for the back-end.
- **Spring Boot 3.4.4**: A framework for building microservices.
- **Spring Integration DSL**: Provides a flexible API for message routing and orchestration.
- **Spring Data JPA**: Simplifies database interactions through Java Persistence API.
- **Lombok**: Reduces boilerplate code by autogenerating Java getters, setters, and constructors.

### Front-End
- **Angular v19.1.x**: A framework for building dynamic and reactive web applications.
- **@angular/material v19.2.8**: For a modern UI based on Google's Material Design.

---

## Features
- **Message Routing**: Dynamically routes messages through predefined queues and filters messages as required.
- **RESTful API Support**: Provides a REST API for CRUD operations.
- **Scalable Front-End**: Angular provides a responsive UI with modular and scalable design.
- **ORM Integration**: Efficient database interaction with Hibernate and JPA.
- **MQ Integration**: Uses **IBM MQ** to handle message queues, including manual testing through the MQ console.

---

## Routing Graph

Below is a high-level graph representing the routing logic between the input queue, process nodes, and the destination queues:
    
    ```
    +-----------------+           +-------------+           +--------------------+
    |  Input Queue    +---------> |  Root Node  +---------> |  SWIFT Queue       |
    |  DEV.QUEUE.1    |           | (Router)    |           |  (DEV.QUEUE.2)     |
    +-------+---------+           +------+------+           +--------------------+
            |                            |
            |                            |                  +--------------------+
            v                            +----------------> | Other format Queue |
    +---------------------+                                 |  (DEV.QUEUE.3)     |
    |  DEV.DEAD.LETTER    |                                 +--------------------+
    |    QUEUE (Error)    |
    +---------------------+
    ```

### Explanation of the Routing Logic:
1. Messages are **posted to the input queue**: `DEV.QUEUE.1`.
2. At the **Root Node (Router)**, messages are routed based on their content:
   - **SWIFT Messages** (e.g., formatted with SWIFT standards) are routed to: `DEV.QUEUE.2`.
   - **Test Messages** are routed to: `DEV.QUEUE.3`.
   - **Error Messages** (e.g., content includes "ERROR") are routed to the dead letter queue: `DEV.DEAD.LETTER.QUEUE`.
3. The output queues process messages accordingly, simulating real-world routing scenarios.

---

## Prerequisites

### Required Tools:
- **JDK 17** or later
- **Node.js** (with npm) to manage Angular dependencies
- **Docker** & **Docker Compose** for running services

### Configuration:
- Set up **database connection properties** in the `application.properties` file.
- Configure **IBM MQ Series**, including the input, output queues, and target queues (defined in `application.properties`).

---

## How to Run the Project

### Running in Production Mode
1. Start all required services using Docker:
   ```bash
   docker-compose up -d
   ```
2. Build the project in the root directory:
   ```bash
   mvn clean install
   ```
3. Navigate to the back-end application folder:
   ```bash
   cd messages-router-app
   ```
4. Run the back-end server:
   ```bash
   mvn spring-boot:run
   ```
5. Access the user interface at:
    - [http://localhost:8080](http://localhost:8080)

---

### Running in Development Mode
1. Start the back-end server (follow the steps above for **Running in Production Mode**).
2. Navigate to the front-end folder:
   ```bash
   cd messages-router-front
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Start Angular in development mode:
   ```bash
   npm run start
   ```
5. Access the application at:
    - **Back-End REST API**: [http://localhost:8080/api](http://localhost:8080/api)
    - **Development Front-End UI**: [http://localhost:4200](http://localhost:4200)

---

## Testing

### IBM MQ Console
- **Login the IBM MQ Console**: (admin/passw0rd) 
  [https://localhost:9443/ibmmq/console/login.html](https://localhost:9443/ibmmq/console/login.html)
- **Post messages to the input queue**:  
  [https://localhost:9443/ibmmq/console/#/manage/qmgr/QM1/queue/local/DEV.QUEUE.1/view](https://localhost:9443/ibmmq/console/#/manage/qmgr/QM1/queue/local/DEV.QUEUE.1/view)

### Test Scenarios
1. **Test Swift Message**  
   Post the following message to queue `DEV.QUEUE.1`.  
   The message will be routed to the `DEV.QUEUE.2` queue:
   ```plaintext
   {1:F01BANKDEFFXXXX0000000000}{2:I103BANKUS33XXXXN}{4:
   :20:REFERENCE12345678
   :23B:CRED
   :32A:250407EUR12345,67
   :33B:EUR12345,67
   :50K:/1234567890
   JOHN DOE
   123 STREET
   PARIS
   :59:/9876543210
   JANE SMITH
   456 AVENUE
   LONDON
   :70:INVOICE 12345
   :71A:OUR
   -}
   ```

2. **Test Any Message**  
   Post a message with the content `test message` to the queue `DEV.QUEUE.1`.  
   The message will be routed to the `DEV.QUEUE.3` queue.

3. **Test Error Message**  
   Post a message with the content `ERROR` to the queue `DEV.QUEUE.1`.  
   The message will be routed to the `DEV.DEAD.LETTER.QUEUE` queue.

4. **Display Messages list**
   Access the application at: [http://localhost:8080](http://localhost:8080)
   The application display the messages list :
   ![UI for messages list](images/messages-list.png)

---

## Project Structure

### Back-End
- **`/src/main/java`**: Contains Java source files for Spring Boot and business logic.
- **`/src/main/resources`**: Stores configuration files (e.g., `application.properties`, logs, and MQ configurations).

### Front-End
- **`/src/app`**: Contains the Angular project structure, including components, services, and modules.
- **`styles.scss`**: Holds global CSS styling for the application.

---

## Contribution
Contributions are welcome! If you want to improve or report a bug, please submit a pull request or open an issue.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
```

### Key Updates:
1. **Added a Routing Graph**: A simple text-based graph to visually represent the routing process.
2. **Explanation of Routing Logic**: Clarified how messages are processed and directed to respective queues.
3. Smoothed flow and structure for better readability.

Let me know if you need any further enhancements!
---

## Technologies Used

### Back-End
- **Java SDK 17**
- **Spring boot 3.4.4**
- **Spring Data JPA**
- **Lombok**

### Front-End
- **Angular v19.1.x**
- **@angular/material v19.2.8** 

---

## Features
- **Message Routing**: Enables handling and routing.
- **RESTful API Support**: Exposes REST APIs for CRUD operations.
- **Front-End Management**: Angular provides a scalable and easily extensible user interface.
- **ORM Integration**: Efficient database handling with Spring Data JPA.


---

## Prerequisites
1. **Required Tools:**
    - JDK 17 or later
    - Node.js (with npm) for managing Angular dependencies (required for dev mode).
    - docker & docker-compose
2. **Configuration:**
    - Set up database connection properties in the `application.properties` file.
    - Set up IBM MQ Series, input and output Queues and target Queues in the `application.properties` file.
---

## How to Run the Project

### Running in test Mode
1. Start all required services using Docker:
   ```bash
   ./docker-compose up -d
   ```
2. Build the project under the project root directory:
   ```bash
   ./mvn clean install
   ```
3. Navigate to the `messages-router-app` folder:
   ```bash
   cd messages-router-app
   ```
4. Run the server:
   ```bash
   ./mvn spring-boot:run
   ```
5. Access the user Interface at: http://localhost:8080

### Running in Development Mode

1. Run 'Back-End Steps'

2. Navigate to the `frontend` folder:
   ```bash
   cd messages-router-front
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start Angular in development mode:
   ```bash
   npm run start
   ```

### Accessing the Application
- **REST API**: [http://localhost:8080/api](http://localhost:8080/api)
- **User Interface**: [http://localhost:8080](http://localhost:8080)
- **User Interface front Dev mode**: [http://localhost:4200](http://localhost:4200)

---

## Testing

### IBM MQ Console
- **Access the IBM MQ Console**:  
  [https://localhost:9443/ibmmq/console/login.html](https://localhost:9443/ibmmq/console/login.html)
- **Post messages to the input queue**:  
  [https://localhost:9443/ibmmq/console/#/manage/qmgr/QM1/queue/local/DEV.QUEUE.1/view](https://localhost:9443/ibmmq/console/#/manage/qmgr/QM1/queue/local/DEV.QUEUE.1/view)

### Test Scenarios
1. **Test Swift Message**  
   Post the following message to queue `DEV.QUEUE.1`.  
   The message will be routed to the `DEV.QUEUE.2` queue:
    ```
    {1:F01BANKDEFFXXXX0000000000}{2:I103BANKUS33XXXXN}{4:
    :20:REFERENCE12345678
    :23B:CRED
    :32A:250407EUR12345,67
    :33B:EUR12345,67
    :50K:/1234567890
    JOHN DOE
    123 STREET
    PARIS
    :59:/9876543210
    JANE SMITH
    456 AVENUE
    LONDON
    :70:INVOICE 12345
    :71A:OUR
    -}
    ```

2. **Test Any Message**  
   Post a message with the content `test message` to queue `DEV.QUEUE.1`.  
   The message should be routed to the `DEV.QUEUE.3` queue.

3. **Test Error Message**  
   Post a message with the content `ERROR` to queue `DEV.QUEUE.1`.  
   The message should be routed to the `DEV.DEAD.LETTER.QUEUE` queue.

---

## Project Structure
### Back-End
- **`/src/main/java`**: Contains Java source files.
- **`/src/main/resources`**: Configuration files (e.g., `application.properties`, `logback.xml`).

### Front-End
- **`/src/app`**: Angular's application structure (components, services, modules, etc.).
- **`styles.scss`**: Global styling file.

---

## Contribution
Contributions are welcome! If you want to improve or report a bug, please submit a pull request or open an issue.

---
