# ManagementSystemMERN

## Getting Started

### Installing

* After cloning the repository run command "npm i" in backend and frontend folders.
* In ./backend/ create a .env file and define 
  ```
  MERN_DB_URI_LOCAL=mongodb://localhost:27017/ManagementPortalMERN
  MERN_DB_URI_ONLINE=

  DOMAIN_NAME="@gmail.com"

  PORT = 5000

  JWT_SECRET=SomeKeyForSecurity

  VERSION=v1
  ```
* In ./frontend/src/ create a config.js file and define 
  ```
  export const apiBaseURL = "http://localhost:5000/api/v1";
  ```


### Executing program

* To start server, Go  in ./backend and execute
  ```
  npm run dev
  ```
* To start client, Go into ./frontend and execute
  ```
  npm start
  ```
* !The Client and Server has to run together for it to work.

### Functioning

* There are 3 categories  
      -Admin  
      -Center  
      -Student  

* Admin   
      - Can register a new Center  
      - Can create a new Course  

* Center   
      - Can add Staff, Faculty  
      - Can admission Students  
      - Can Look at pending enquiries and edit thrie pending state  
      - Can create a new batch and add students to it  
      - Faculty can put attendance of students  

* Student  
      - Can View Courses  

* Open Page  
      - Enquire  
