// Imports from server files
const connect = require("./../connect");

// This query will flush out all the rows that are in the academic_levels Table
const flushAcLevels = `
    DELETE FROM academic_levels;
`;

// This query will reseed the academic_levels table
const seedAcLevels = `
    INSERT INTO academic_levels (name, duration_in_months) 
    VALUES
        ('Bachelor of Engineering', 48),
        ('Master of Engineering', 24),  
        ('Doctor of Philosophy in Engineering', 60);
`;

(async function () {
    let connection;

    try {
        connection = await connect();

        await connection.query(flushAcLevels);
        await connection.query(seedAcLevels);

        console.log("PASS    DB_SD_07");
    } catch (error) {

        console.log("ERROR    DB_SD_07");
        console.log(error);

    } 
})();