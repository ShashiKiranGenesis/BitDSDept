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
10- A_R_S (x) <Additional Resources To Students>
11- I_T_R_E(x) <Innovative Teaching and Resource Enhancement>
12- Exam Duties(x)
13- S_C_A_R(x) <Significant Contributions and Awards Recieved>
14- E_C_F_A(x) <Extention, Cocurricular and Field Based Activity>
15- C_C_L_M(x) <Contribution to Corporate Life and Management>
16- P_D_A(x) <Professional Development Activity>
17- P_P_J(x) <Published Papers in Journals>
18- A_C_P(x) <Articles or Chapters Published>
19- F_P_C(x) <Full Papers in Conference>
20- Books Published(x)
21- O_C_R_P_C(x) <On-Going Research Projects and Consultancies>
22- Research Guidance(x)
23- D_P_A(x) <Development Program for Students/Faculty Attended>
24- P_P_C_S_W(x) <Papers Presented in Conference, Seminar, Workshop>
25- P_I_G_S(x) <Programmes invited as Guest/Speaker>

DB: Data Base
    TC: Table Creation
    SD: Table Seeding    

SERV: Express app Server
    ST: Server Transformation
        01: Server Turning ON
-------------------------------------------------------------------
-----------------------------ROUGH---------------------------------
-------------------------------------------------------------------

