const bcrypt = require("bcrypt");

const HashPassword = async(password)=>{
    const hash = await bcrypt.hash(password,12);

    return hash;
}

const ComparePassword = async(password,hash)=>{
    return await bcrypt.compare(password,hash)
}


module.exports = {HashPassword,ComparePassword}