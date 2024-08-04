// Imports from server files
const connect = require("./../connect");

// This query will flush out all the rows that are in the departments table
const flushDepartments = `
    DELETE FROM departments;
`;

// This query will reseed the departments table with data collected on
// 10-02-2024
const seedDepartments = `
INSERT INTO departments (name, established_on) 
VALUES
    ('Civil Engineering', '1979-01-01'),
    ('Mechanical Engineering', '1979-01-01'),
    ('Electrical and Electronics Engineering', '1979-01-01'),
    ('Electronics and Communication Engineering', '1979-01-01'),
    ('Computer Science and Engineering', '1981-01-01'),
    ('Electronics and Instrumentation Engineering', '1982-01-01'),
    ('Industrial Engineering and Management', '1986-01-01'),
    ('Electronics and Telecommunication Engineering', '1992-01-01'),
    ('Information Science and Engineering', '2000-01-01'),
    ('Artificial Intelligence and Machine Learning', '2020-01-01'),
    ('CSE (IOT & Cyber Security, Blockchain Technology)', '2022-01-01'),
    ('Computer Science & Engineering (Data Science)', '2022-01-01'),
    ('Robotics & Artificial Intelligence', '2022-01-01'),
    ('Electronic Engineering (VLSI Design & Technology)', '2022-01-01'),
    ('Master of Business Administration (MBA)', '2006-01-01'),
    ('Master of Computer Applications (MCA)', '1997-01-01'),
    ('Physics', '1979-01-01'),
    ('Chemistry', '1979-01-01'),
    ('Mathematics', '1979-01-01');
`;

(async function () {
    let connection;
    
    try {
        connection = await connect();
        
        await connection.query(flushDepartments);
        await connection.query(seedDepartments);

        console.log("PASS    DB_SD_01");
    } catch (error) {
        
        console.log("ERROR    DB_SD_01");
        console.log(error);
    
    }
})();