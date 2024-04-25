//Imports from node modules
const bcrypt = require("bcrypt");


const hashPassword = async function (password) {
    let hash;

    try {
        // The Default salt rounds we will be using is 10
        hash = bcrypt.hash(password, 10);
    } catch (error) {
        console.log("ERROR    Something went wrong while hashing!");
        console.log(error?.message);
    } finally {
        return hash;
    }

}


const isSamePassword = async function (password, hash) {

    let flag = false;

    try {
        flag = await bcrypt.compare(password, hash);
    } catch (error) {
        console.log("ERROR    Something went wrong while comparing passwords");
        console.log(error.message);
    } finally {
        return flag;
    }

}

module.exports = { hashPassword, isSamePassword };