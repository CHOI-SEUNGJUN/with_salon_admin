const utils = require('../../utils/db');
const config = require('../../config/db');

let db = config.database;

/*  
 *  Create a new Salon
 *  check if a salon already exists or not.
 *  
 */
const createNewContent = (req, res) => {
  
  let content = {
    "category" : req.body.category,
    "pageNum": req.body.pageNum,
    "contentImageURI": req.body.contentImageURI,
    "questionImageURI": req.body.questionImageURI,
    "questionContent": req.body.questionContent,
    "popUpImageURI": req.body.popUpImageURI,
    "popUpMessage": req.body.popUpMessage,
  };

  const p = async (content) => {
    
    let sql  = "INSERT INTO `" + db + "`.`salon`";
        sql += "(category, pageNum, contentImage, questionImage, questionContent, popupImage, popupMessage) ";
        sql += "VALUES(" + content.category + ", " + content.pageNum + ", '" + content.contentImageURI;
        sql += "', '" + content.questionImageURI + "', '" + content.questionContent + "', '" + content.popUpImageURI;
        sql += "', '" + content.popUpMessage + "')";
    console.log(sql);
    let result = await utils.sqlQueryPromise(sql);

    res.status(200).json({
      "message": "Creating a New Content Success!",
      "data": null,
    })
  }
  console.log("content :", content);
  return p(content);
}

/*
 * 
 */
const getContents = (req, res) => {
  const p = async () => {

    let sql = "SELECT * FROM `" + db + "`.`salon`;"
    let contents = await utils.sqlQueryPromise(sql);
    res.status(200).json({
      "message": "Content List",
      "data": contents,
    })
    
  }
  return p();
}

const deleteContent = (req, res) => {
  let idx = req.body.idx
  console.log(idx)

  const p = async () => {

    let sql = "DELETE FROM salon "
        sql += "WHERE idx = " + idx + ";"
    console.log(sql)
    await utils.sqlQueryPromise(sql);
    res.status(200).json({
      "message": "delete success",
      "data": null,
    })
    
  }
  return p();
}

module.exports = {
  createNewContent,
  getContents,
  deleteContent
}