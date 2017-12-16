const PlayersController = require('@controllers/players_controller')
let express = require('express')
const router = express.Router()
const passport = require('passport')
const config = require('@config')
const jwt = require('jsonwebtoken')


// Get list of players
router.get('/players', PlayersController.getPlayers)
router.post('/players', PlayersController.getPlayers)
// Get player details
router.get('/players/:id',  PlayersController.getPlayer)

// Making sure a user CAN NOT edit someone else's profile
router.use('/players/:id/:alterdata', passport.authenticate('jwt'), (req, res, next) => {
  jwt.verify(req.query.token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
            title: 'Not Authenticated',
            error: err
        })
      }
      console.log(decoded.id)
      console.log(req.params.id)
      if (decoded.id != req.params.id) {
        return res.status(401).json({
          title: 'Not your profile sry bro',
          error: err
        })
      }
      next();
  })
});

// Edit player
router.post('/players/:id/edit', PlayersController.editPlayer)
router.get('/players/:id/update', PlayersController.updatePlayer)
router.get('/players/:id/add-friend', PlayersController.addFriend)

module.exports = router