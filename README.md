# E-Clearance-System
This is a simple Electronical Clearance System, the function is to dynamically clear students and as well as generate Clearance Certificate, which can be gooten after they must been cleared from the various departments and sections of the institution

## Application Features:
-   Easy navigation for students
-   Automated check status of each student
-   Admin Dashboards for (Bursar, Lab Technologiest, Security, School Admin, Deans and HODs Etc.)
-   Easy Update and Deleting of records
-   can be Hosted through LAN or as a Web Application

## Task and How To Use The Application
-   Registered students can login to the site using their-Reg No and Password generated during their BIO registrateion process
-   Students can easily check the clerance status from their dashboard
-   Each Admin has one task to perfom which is to clear a student from their designated department i.e (lab technologist will only have the ability to clear students on the labouratory "clear status")
-   Once a student is cleared he/she can proceed to obtain the clearance Certificate from their dashboard
-   The authenticity of the letter remains proven only if the student's record exist in the 'school DB', this was initialized to afford 'furggery of Cerificate'

**For Offline Purposes**
After cloning the repo to your local computer, install the necessary nodemon dependencies, Create a database (MySQL Database) with the name "student_clearance" import the file("student_clearance.sql") from the "MySQL-DB" folder inside "Public". change the "Conn.js" to that of your local computer username and password.

Start the App with "npm start" on the CLT