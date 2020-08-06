const utils = require('../../utils/db');
const config = require('../../config/db');

let db = config.database;

/*  
 *  Create a new Salon
 *  check if a salon already exists or not.
 */
const createNewSalon = (req, res) => {
  let salon = {
    "roomName": req.body.roomName,
    "password": req.body.password,
    "category": req.body.category,
    "progressDate": req.body.progressDate,
  };
  const p = async (salon) => {
    
    let sql  = "INSERT INTO `room`";
        sql += "(roomName, category, password, progressDate) ";
        sql += "VALUES ('" + salon.roomName + "', " + salon.category + ", '" + salon.password + "', '"+ salon.progressDate + "')";
      
    let result = await utils.sqlQueryPromise(sql);

    res.status(200).json({
      "message": "Creating a New Salon Success!",
      "data": null,
    })
  }

  // console.log("New Salon : ", salon);

  return p(salon);
}

/*
 * 
 */
const getSalonList = (req, res) => {
  const p = async () => {
    let sql = "SELECT * FROM `" + db + "`.`room`;"
    let salons = await utils.sqlQueryPromise(sql);
    res.status(200).json({
      "message": "salon List",
      "data": salons,
    })
    
  }
  return p();
}

const resetSalonPassword = (req, res) => {
  defaultPassword = "200326";
  
  const p = async () => {
    let sql = "UPDATE room SET password = " + defaultPassword + ";";
    console.log(sql);

    let result = await utils.sqlQueryPromise(sql);
    res.status(200).json({
      "message": "reset salon password",
      "data": result,
    })
  }

  return p();
}

module.exports = {
  createNewSalon,
  getSalonList,
  resetSalonPassword
}