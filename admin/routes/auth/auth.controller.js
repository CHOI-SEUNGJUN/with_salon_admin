const secret = require('../../config/secret')

const signIn = (req, res) => {
  let userId = req.body.email;
  let password = req.body.password;
  
  
  if ( secret.dummyAdmin.id == userId && secret.dummyAdmin.password == password) { // TODO: sign-in should be implemented officially
    res.status(200).json({
      message: "Welcome!",
      data: null,
    })
  } else { // sign-in failure
    res.status(401).json({
      message: "Unauthorized Access.",
      data: null,
    })
  }
}

module.exports = {
  signIn,

}