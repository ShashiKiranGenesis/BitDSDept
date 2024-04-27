// Imports from server files
const connect = require("./../connect");

// This Query will Flush out all the Rows that are in the Courses Table
const flushCourses = `
    DELETE FROM courses;
`;

// This query will Reseed the Courses Table with Fake Courses
const seedCourses = `
    INSERT INTO courses (name, level_id, cpw, code) 
    VALUES
        ('Introduction to Engineering', 1, 4, 'ENG101'),
        ('Engineering Mathematics I', 1, 5, 'ENG102'),
        ('Engineering Physics', 1, 4, 'ENG103'),
        ('Computer Programming for Engineers', 1, 5, 'ENG104'),
        ('Engineering Graphics', 1, 4, 'ENG105'),
        ('Mechanics of Solids', 1, 5, 'ENG106'),
        ('Electrical Engineering Fundamentals', 1, 4, 'ENG107'),
        ('Engineering Thermodynamics', 1, 5, 'ENG108'),
        ('Materials Science for Engineers', 1, 4, 'ENG109'),
        ('Engineering Ethics', 1, 3, 'ENG110'),
        ('Advanced Structural Analysis', 2, 4, 'ENG201'),
        ('Environmental Engineering', 2, 5, 'ENG202'),
        ('Engineering Geology', 2, 4, 'ENG203'),
        ('Fluid Mechanics', 2, 5, 'ENG204'),
        ('Engineering Economics', 2, 3, 'ENG205'),
        ('Industrial Engineering', 3, 4, 'ENG301'),
        ('Quality Control and Management', 3, 5, 'ENG302'),
        ('Engineering Project Management', 3, 4, 'ENG303'),
        ('Engineering Optimization', 3, 5, 'ENG304'),
        ('Introduction to Aerospace Engineering', 1, 4, 'ENG111'),
        ('Mechanical Engineering Design', 1, 5, 'ENG112'),
        ('Civil Engineering Materials', 1, 4, 'ENG113'),
        ('Introduction to Chemical Engineering', 1, 5, 'ENG114'),
        ('Introduction to Biomedical Engineering', 1, 4, 'ENG115'),
        ('Engineering Ethics II', 1, 3, 'ENG116'),
        ('Advanced Heat Transfer', 2, 4, 'ENG206'),
        ('Transportation Engineering', 2, 5, 'ENG207'),
        ('Engineering Hydrology', 2, 4, 'ENG208'),
        ('Renewable Energy Engineering', 2, 5, 'ENG209'),
        ('Engineering Management', 2, 3, 'ENG210'),
        ('Operations Research', 3, 4, 'ENG305'),
        ('Project Engineering', 3, 5, 'ENG306'),
        ('Reliability Engineering', 3, 4, 'ENG307'),
        ('Systems Engineering', 3, 5, 'ENG308'),
        ('Introduction to Robotics', 1, 4, 'ENG117'),
        ('Engineering Mechanics', 1, 5, 'ENG118'),
        ('Structural Engineering Design', 1, 4, 'ENG119'),
        ('Chemical Process Engineering', 1, 5, 'ENG120'),
        ('Biomechanics', 1, 4, 'ENG121'),
        ('Engineering Ethics III', 1, 3, 'ENG122'),
        ('Advanced Fluid Dynamics', 2, 4, 'ENG211'),
        ('Hydraulic Engineering', 2, 5, 'ENG212'),
        ('Geotechnical Engineering', 2, 4, 'ENG213'),
        ('Solar Energy Engineering', 2, 5, 'ENG214'),
        ('Construction Management', 2, 3, 'ENG215'),
        ('Supply Chain Engineering', 3, 4, 'ENG309'),
        ('Product Development', 3, 5, 'ENG310'),
        ('Process Optimization', 3, 4, 'ENG311'),
        ('Industrial Automation', 3, 5, 'ENG312'),
        ('Advanced Robotics', 1, 4, 'ENG123'),
        ('Automotive Engineering', 1, 5, 'ENG124'),
        ('Earthquake Engineering', 1, 4, 'ENG125'),
        ('Petroleum Engineering', 1, 5, 'ENG126'),
        ('Biochemical Engineering', 1, 4, 'ENG127'),
        ('Engineering Ethics IV', 1, 3, 'ENG128'),
        ('Advanced Materials Science', 2, 4, 'ENG216'),
        ('Coastal Engineering', 2, 5, 'ENG217'),
        ('Water Resources Engineering', 2, 4, 'ENG218'),
        ('Wind Energy Engineering', 2, 5, 'ENG219'),
        ('Project Risk Management', 2, 3, 'ENG220'),
        ('Logistics Engineering', 3, 4, 'ENG313'),
        ('Lean Manufacturing', 3, 5, 'ENG314'),
        ('Facility Design and Management', 3, 4, 'ENG315'),
        ('Big Data Analytics in Engineering', 3, 5, 'ENG316'),
        ('Advanced Control Systems', 1, 4, 'ENG129'),
        ('Nanotechnology in Engineering', 1, 5, 'ENG130'),
        ('Transport Phenomena', 1, 4, 'ENG131'),
        ('Petroleum Reservoir Engineering', 1, 5, 'ENG132'),
        ('Tissue Engineering', 1, 4, 'ENG133'),
        ('Engineering Ethics V', 1, 3, 'ENG134'),
        ('Advanced Structural Dynamics', 2, 4, 'ENG221'),
        ('Environmental Impact Assessment', 2, 5, 'ENG222'),
        ('Geographical Information Systems in Engineering', 2, 4, 'ENG223'),
        ('Renewable Energy Policy and Planning', 2, 5, 'ENG224'),
        ('Operations Management', 2, 3, 'ENG225'),
        ('Quality Engineering', 3, 4, 'ENG317'),
        ('Six Sigma in Engineering', 3, 5, 'ENG318'),
        ('Product Lifecycle Management', 3, 4, 'ENG319'),
        ('Data Mining for Engineering Applications', 3, 5, 'ENG320');
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