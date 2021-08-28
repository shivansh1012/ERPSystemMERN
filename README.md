# ManagementSystemMERN

## Getting Started

### Installing

* After cloning the repository run command 
  ```
  npm i
  ```
  
in backend and frontend folders.
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

* Go to http://localhost:3000/init on browser and click Init Resources Button(this initilizes admin and db in mongodb)

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
