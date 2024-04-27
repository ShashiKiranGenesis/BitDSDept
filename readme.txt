To Set up the Data Base and Server Follow this order: 

Firstly set up the .env file
    1. First create a database in your mysql by : CREATE DATABASE <db name> in mysql shell
    2. initialise all the other variables in the env

Go to database/tables folder
    1. This contains 4 folders [departments, designations, employees, users]
    2. Each folder contains a file of the same folder name.
    3. Go to each file in the Order[departments, designations, employees, users] and load the create table query in the specified place and click on run.
    4. All four tables should have been created. Now go to employees.js, load and run the altertable query
    5. Go to database/connector tables/, load and run the employee_designation file

Next Go to seeders/ folder
    1. Execute each file in this given order [departmentSeeder, designationSeeder, employeeSeeder, employee_designationSeeder]
    
Initially to start adding employees, go to routes/authRoutes.js, comment out the block of code on line 40.

STATUS CODE SUMMARY

TABLE NUMBERS
01- Departments Table
02- Employees Table
03- Designations Table
04- Users Table (x)
05- Employee-Designation Table(x)
06- Qualifications Table (x)
07- Academic Levels
08- Courses
09- I_S_T_H (x) <Instructor Semester Teaching Hours>

DB: Data Base
    TC: Table Creation
    SD: Table Seeding    

SERV: Express app Server
    ST: Server Transformation
        01: Server Turning ON
-------------------------------------------------------------------
-----------------------------ROUGH---------------------------------
-------------------------------------------------------------------

