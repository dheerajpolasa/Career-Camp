# Career Camp -> Company Internal Working (Scalabe MVC-Architecture)

> A full stack project for internal working of a company where student records and interviews are maintained properly

### Prerequisites

> Dependencies/Libraries
```
Express
Nodemon (optional)
Passport
Passport-local
Objects-to-csv
body-parser
mongoose
bcrypt
ejs
express-ejs-layouts
```

### Setting up the project
```
Clone the project from here
Create an environment.js file in config folder and export all the details required for db connection from there.
Check the mongoose.js config file for the variable names
Execute node index.js command
```

### Folder Structure
```
    ├── index.js
    ├── package.json
    ├── assests
        ├── css
        |   ├── home.css
        |   ├── _header.css
        ├── downloads
        |   ├── student-interview-csv.csv
        ├── js
        |   ├── form.js
        |   ├── student.js
        |   ├── interivew.js
        ├── scss
        |   ├── home.scss
        |   ├── _header.scss
    ├── config
        ├── mongoose.js
        ├── passport-local-strategy.js    
    ├── controllers
        ├── interview_controller.js  
        ├── student_controller.js     
        ├── employee_controller.js
    ├── models
        ├── interview.js
        ├── student.js
        ├── employee.js
    ├── routes  
        ├── interview.js
        ├── student.js
        ├── employee.js
        ├── index.js
    ├── views
        ├── _footer.ejs
        ├── _header.ejs
        ├── home.ejs
        ├── interview.ejs
        ├── layout.ejs
        ├── sign-in.ejs
        ├── sign-up.ejs
        ├── student.ejs
    ├── .gitignore
```

# Using the Project
```
1. /student/create -> for creating the create
2. /student/all -> to fetch all the student
3. /student/:id -> to fetch the details of one student
4. /interview/create -> to create the interview
5. /interview/:id -> to fetch the interview details
6. /interivew/download/all -> to download the csv file including all the details
7. /interview/update/:id -> to update the interview status
8. /employee/sign-in -> to render the sign in page
9. /employee/sign-up -> to render the sign up page
10. /employee/create -> to create the employee
11. /employee/create-session -> to create the employee session
12. /employee/destroy-session -> to destory the employee session
