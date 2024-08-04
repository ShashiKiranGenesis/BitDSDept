// Imports from server files
const connect = require("./../connect");

// This query will flush out all the rows that are in the departments table
const flushEmployeeDesignation = `
    DELETE FROM employee_designation;
`;

// This query will reseed the departments table with data collected on
// 10-02-2024
const seedEmployee_Designation = `
INSERT INTO employee_designation (vtu_id, title)
VALUES
    ('VTU001', 'Assistant Professor'),
    ('VTU001', 'Professor'),
    ('VTU002', 'Associate Professor'),
    ('VTU003', 'Professor'),
    ('VTU003', 'Head of Department'),
    ('VTU004', 'Student'),
    ('VTU005', 'Professor'),
    ('VTU006', 'Professor'),
    ('VTU006', 'Student'),
    ('VTU007', 'Head of Department'),
    ('VTU008', 'Assistant Professor'),
    ('VTU009', 'Student'),
    ('VTU010', 'Professor'),
    ('VTU011', 'Associate Professor'),
    ('VTU012', 'Head of Department'),
    ('VTU013', 'Professor'),
    ('VTU014', 'Professor'),
    ('VTU015', 'Student'),
    ('VTU016', 'Assistant Professor'),
    ('VTU017', 'Professor'),
    ('VTU018', 'Head of Department'),
    ('VTU019', 'Associate Professor'),
    ('VTU020', 'Student'),
    ('VTU021', 'Admin'),
    ('VTU022', 'Professor'),
    ('VTU023', 'Head of Department'),
    ('VTU024', 'Assistant Professor'),
    ('VTU025', 'Student');
`;

(async function () {
    let connection;
    
    try {
        connection = await connect();
        
        await connection.query(flushEmployeeDesignation);
        await connection.query(seedEmployee_Designation);

        console.log("PASS    DB_SD_05");
    } catch (error) {
        
        console.log("ERROR    DB_SD_05");
        console.log(error);
    
    } 
})();