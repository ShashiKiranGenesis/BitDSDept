// Imports from server files
const connect = require("./../connect");

// This query will flush out all the rows that are in the designations table
const flushDesignations = `
    DELETE FROM designations;
`;

// This query will reseed the designations table 
// with some posts available at BIT

const seedDesignations = `
    INSERT INTO designations (title, level)
    VALUES
        ('Student', 0),
        ('Assistant Professor', 1),
        ('Associate Professor', 2),
        ('Professor', 3),
        ('Head of Department', 4),
        ('Admin', 5);
`;

(async function () {
    let connection;

    try {
        connection = await connect();

        await connection.query(flushDesignations);
        await connection.query(seedDesignations);

        console.log("PASS    DB_SD_03");
    } catch (error) {

        console.log("ERROR    DB_SD_03");
        console.log(error.sqlMessage);

    } finally {
        connection.end();
    }

})();