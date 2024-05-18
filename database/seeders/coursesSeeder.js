// Imports from server files
const connect = require("./../connect");

// This Query will Flush out all the Rows that are in the Courses Table
const flushCourses = `
    DELETE FROM courses;
`;

// This query will Reseed the Courses Table with Fake Courses
const seedCourses = `
    INSERT INTO courses (name, a_level, cpw, lpw, code) 
    VALUES
        ('Introduction to Engineering', 'Bachelor of Engineering', 3, 2, 'ENG101'),
        ('Engineering Mechanics', 'Bachelor of Engineering', 3, 2, 'ENG102'),
        ('Engineering Mathematics', 'Bachelor of Engineering', 4, 0, 'ENG103'),
        ('Materials Science', 'Bachelor of Engineering', 3, 3, 'ENG104'),
        ('Thermodynamics', 'Bachelor of Engineering', 3, 2, 'ENG105'),
        ('Fluid Mechanics', 'Bachelor of Engineering', 3, 2, 'ENG106'),
        ('Electrical Engineering Basics', 'Bachelor of Engineering', 3, 2, 'ENG107'),
        ('Control Systems', 'Bachelor of Engineering', 3, 2, 'ENG108'),
        ('Mechanical Design', 'Bachelor of Engineering', 3, 3, 'ENG109'),
        ('Environmental Engineering', 'Bachelor of Engineering', 3, 2, 'ENG110'),
        ('Advanced Engineering Mathematics', 'Master of Engineering', 4, 0, 'ENG201'),
        ('Finite Element Analysis', 'Master of Engineering', 3, 2, 'ENG202'),
        ('Advanced Control Systems', 'Master of Engineering', 3, 2, 'ENG203'),
        ('Robotics', 'Master of Engineering', 3, 3, 'ENG204'),
        ('Energy Systems', 'Master of Engineering', 3, 2, 'ENG205'),
        ('Structural Analysis', 'Master of Engineering', 3, 2, 'ENG206'),
        ('Engineering Project Management', 'Master of Engineering', 3, 1, 'ENG207'),
        ('Advanced Fluid Dynamics', 'Master of Engineering', 3, 2, 'ENG208'),
        ('Signal Processing', 'Master of Engineering', 3, 2, 'ENG209'),
        ('Renewable Energy Technologies', 'Master of Engineering', 3, 2, 'ENG210'),
        ('Engineering Thesis', 'Doctor of Philosophy in Engineering', 2, 6, 'ENG301'),
        ('Advanced Robotics', 'Doctor of Philosophy in Engineering', 3, 3, 'ENG302'),
        ('Nanotechnology', 'Doctor of Philosophy in Engineering', 3, 3, 'ENG303'),
        ('Computational Mechanics', 'Doctor of Philosophy in Engineering', 3, 2, 'ENG304'),
        ('Advanced Materials', 'Doctor of Philosophy in Engineering', 3, 3, 'ENG305'),
        ('Engineering Ethics', 'Doctor of Philosophy in Engineering', 3, 1, 'ENG306');
`;

(async function () {
    let connection;

    try {
        connection = await connect();

        await connection.query(flushCourses);
        await connection.query(seedCourses);

        console.log("PASS    DB_SD_08");
    } catch (error) {

        console.log("ERROR    DB_SD_08");
        console.log(error);

    } finally {
        connection.end();
    }

})();