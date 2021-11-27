module.exports = {

    isLoggedIn: (req, res, next) => {
        if (req.session.user) {
          next()
        } else {
          res.status(403).json({message: "You don't have and user, so you can't do this"})
        }
      },
/* 
    isAdmin: (req, res, next) => {
        if (req.session.user.isAdmin) {
            next()
          } else {
            res.status(403).json({message: "You don't have and user, so you can't loggin"})
          }
        } */

}