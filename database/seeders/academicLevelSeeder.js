// Imports from server files
const connect = require("./../connect");

// This query will flush out all the rows that are in the academic_levels Table
const flushAcLevels = `
    DELETE FROM academic_levels;
`;

// This query will reseed the academic_levels table
const seedAcLevels = `
    INSERT INTO academic_levels (level_name) 
    VALUES
        ('Undergraduate'),
        ('Postgraduate'),
        ('Doctorate');
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

    } finally {
        connection.end();
    }

})();