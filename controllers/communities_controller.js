const Community = require('@models/community')
const Player = require('@models/player')
const request = require('request-promise')
const config = require('@config')
const jwt = require('jsonwebtoken')

module.exports = {
  
  createCommunity(req, res, next) {
    console.log(req.body)
    let data = new Community(req.body.data)
    // console.log(data)
    data.admins.push(req.body.player.player)
    data.save()
    Player.findOneAndUpdate({_id: req.body.player.player}, {$push: {"communities" : data._id}})
    .then(community => {
      console.log('New community created')
      res.send(community)
    })
    .catch(err => {
      console.log(err)
    })
  }
}