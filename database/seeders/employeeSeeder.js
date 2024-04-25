// Imports from server files
const connect = require("./../connect");

// This query will flush out all the rows that are in the departments table
const flushEmployees = `
    DELETE FROM employees;
`;

// This query will reseed the departments table with data collected on
// 10-02-2024
const seedEmployees = `
INSERT INTO employees (vtu_id, full_name, father_name, mother_name, mobile, emergency_mobile, pad, email_address, pan_number)
VALUES
    ('VTU001', 'Rajesh Kumar', 'Suresh Kumar', 'Sunita Kumar', 'mob1', '0987654321', '123 Main Street, Delhi', 'rajesh.kumar@example.com', 'ABCDE1234F'),
    ('VTU002', 'Amit Sharma', 'Ramesh Sharma', 'Rekha Sharma', 'mob2', '2345678901', '456 Elm Street, Mumbai', 'amit.sharma@example.com', 'FGHIJ5678E'),
    ('VTU003', 'Priya Patel', 'Anil Patel', 'Preeti Patel', 'mob3', '3456789012', '789 Oak Avenue, Ahmedabad', 'priya.patel@example.com', 'KLMNO9012D'),
    ('VTU004', 'Deepak Singh', 'Arun Singh', 'Anita Singh', 'mob4', '4567890123', '1011 Pine Road, Jaipur', 'deepak.singh@example.com', 'PQRST3456C'),
    ('VTU005', 'Anjali Gupta', 'Vikas Gupta', 'Vidya Gupta', 'mob5', '5678901234', '1314 Maple Lane, Lucknow', 'anjali.gupta@example.com', 'UVWXY6789B'),
    ('VTU006', 'Aarti Yadav', 'Rajendra Yadav', 'Ritu Yadav', 'mob6', '6789012345', '1516 Cedar Court, Patna', 'aarti.yadav@example.com', 'ZABCD1234A'),
    ('VTU007', 'Vivek Verma', 'Sanjay Verma', 'Savita Verma', 'mob7', '7890123456', '1718 Birch Street, Chandigarh', 'vivek.verma@example.com', 'EFGHI5678Z'),
    ('VTU008', 'Neha Joshi', 'Ashish Joshi', 'Nisha Joshi', 'mob8', '8901234567', '1920 Walnut Avenue, Pune', 'neha.joshi@example.com', 'JKLMN9012Y'),
    ('VTU009', 'Rahul Malhotra', 'Sudhir Malhotra', 'Sangeeta Malhotra', 'mob9', '9012345678', '2122 Oakwood Drive, Kolkata', 'rahul.malhotra@example.com', 'OPQRS2345X'),
    ('VTU010', 'Pooja Khanna', 'Rajiv Khanna', 'Renu Khanna', 'mob10', '0123456789', '2324 Pine Street, Bengaluru', 'pooja.khanna@example.com', 'TUVWX6789W'),
    ('VTU011', 'Aruna Reddy', 'Prakash Reddy', 'Priya Reddy', 'mob11', '1234567890', '2526 Cedar Lane, Hyderabad', 'aruna.reddy@example.com', 'YZABC3456V'),
    ('VTU012', 'Sandeep Kapoor', 'Rajesh Kapoor', 'Renuka Kapoor', 'mob12', '2345678901', '2728 Birch Road, Chennai', 'sandeep.kapoor@example.com', 'DEFGH9012U'),
    ('VTU013', 'Ananya Bhat', 'Vijay Bhat', 'Vidya Bhat', 'mob13', '3456789012', '2930 Walnut Street, Goa', 'ananya.bhat@example.com', 'IJKLM5678T'),
    ('VTU014', 'Alok Desai', 'Pradeep Desai', 'Preeti Desai', 'mob14', '4567890123', '3132 Oak Avenue, Jaipur', 'alok.desai@example.com', 'MNOPQ6789S'),
    ('VTU015', 'Geeta Singhania', 'Suresh Singhania', 'Sunita Singhania', 'mob15', '5678901234', '3334 Pine Lane, Mumbai', 'geeta.singhania@example.com', 'RSTUV1234R'),
    ('VTU016', 'Anil Gupta', 'Prakash Gupta', 'Priya Gupta', 'mob16', '6789012345', '3536 Cedar Street, Kolkata', 'anil.gupta@example.com', 'WXYZA5678Q'),
    ('VTU017', 'Rajesh Shah', 'Amit Shah', 'Rina Shah', 'mob17', '7890123456', '3738 Birch Court, Bengaluru', 'rajesh.shah@example.com', 'BCDEF2345P'),
    ('VTU018', 'Sonali Sharma', 'Anand Sharma', 'Anjali Sharma', 'mob18', '8901234567', '3940 Walnut Road, Delhi', 'sonali.sharma@example.com', 'GHIJK6789O'),
    ('VTU019', 'Kunal Mehta', 'Dinesh Mehta', 'Deepika Mehta', 'mob19', '9012345678', '4142 Oak Lane, Pune', 'kunal.mehta@example.com', 'LMNOP1234N'),
    ('VTU020', 'Priyanka Gupta', 'Rakesh Gupta', 'Rashmi Gupta', 'mob20', '0123456789', '4344 Pine Street, Hyderabad', 'priyanka.gupta@example.com', 'QRSTU5678M'),
    ('VTU021', 'Vikram Patel', 'Mahesh Patel', 'Mona Patel', 'mob21', '1234567890', '4546 Cedar Avenue, Chennai', 'vikram.patel@example.com', 'VWXYZ2345L'),
    ('VTU022', 'Nisha Singh', 'Manoj Singh', 'Meera Singh', 'mob22', '2345678901', '4748 Birch Lane, Mumbai', 'nisha.singh@example.com', 'ABCDE6789K'),
    ('VTU023', 'Rajiv Gupta', 'Pradeep Gupta', 'Pooja Gupta', 'mob23', '3456789012', '4950 Walnut Street, Bengaluru', 'rajiv.gupta@example.com', 'FGHIJ1234J'),
    ('VTU024', 'Preeti Sharma', 'Rajendra Sharma', 'Roma Sharma', 'mob24', '4567890123', '5152 Oak Road, Kolkata', 'preeti.sharma@example.com', 'KLMNO5678I'),
    ('VTU025', 'Vishal Jain', 'Sanjay Jain', 'Suman Jain', 'mob25', '5678901234', '5354 Pine Court, Mumbai', 'vishal.jain@example.com', 'PQRST2345H');

`;

(async function () {
    let connection;
    
    try {
        connection = await connect();
        
        await connection.query(flushEmployees);
        await connection.query(seedEmployees);

        console.log("PASS    DB_SD_02");
    } catch (error) {
        
        console.log("ERROR    DB_SD_02");
        console.log(error);
    
    } finally {
        connection.end();
    }
    
})();