const Player = require('@models/player')
const Team = require('@models/team')
const Post = require('@models/post')
const Community = require('@models/community')
const request = require('request-promise')
const convertor = require('steam-id-convertor')
const config = require('@config')
const jwt = require('jsonwebtoken')

module.exports = {

    getPlayers(req, res, next) {
        let query = buildQuery(req.body)
        Player.find(query).limit(30)
        .then((players) => {
            res.send(players)
        })
        .catch(err => {
            console.log(err)
        })
    },

    getPlayer(req, res, next) {
        Player.findOne({_id: req.params.id})
        .populate([{path: 'teams', model: Team}, {path: 'communities', model: Community}])
        .exec(function (err, team) {
        if (err) return console.log(err);
        return;
        })
        .then(player => {
            res.send(player)
        })
        .catch(err => {
            console.log(err)
        })
    },

    editPlayer(req, res, next) {
        Player.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        .then(player => {
            res.send(player)
        })
        .catch(err => {
            res.send(err)
        })
    },

    getPlayerPosts(req, res, next) {
        console.log(req.body)
        // Only return one message from each conversation to display as snippet
        Post.find({author: req.body._id}).limit(30)
        .sort({createdAt: 'descending'})
        .populate({path: 'author', model: Player, select: '_id img steamName'})
        .then(posts => {
          console.log(posts)
          res.send(posts)
        })
        .catch(err => {
          console.log('This is error message')
          res.send(err)
        })
    },

    // TODO: update all data from OpenDota
    updatePlayer(req, res, next) {
        // Convert steam64 to 32 to use OpenDOTA Api
        const steam32 = convertor.to32(req.params.id) 
        console.log('Steam32: ' + steam32)
        let data = {
            heroes: {}
        }

        request.get(`https://api.opendota.com/api/players/${steam32}/heroes?having=1`)
            .then(dataJSON => {
                data.heroes = JSON.parse(dataJSON)
                console.log("HEROES ACQUIRED")
                Player.findOneAndUpdate({ steamId: req.params.id }, { $set: data }, { new: true })
                .then(player => {
                    console.log(player)
                    res.send(player)
                })
                .catch(err => {
                    res.send(err)
                })
            })
            .catch(err => {
                res.send(err)
            })
    },
    // TODO: make this check for a friends request before adding friend to friendslist
    addFriend(req, res, next) {
        jwt.verify(req.query.token, config.secret, (err, decoded) => {
            if (decoded.id) {
                Player.findOne({steamId: req.params.id})
                .then(friend => {
                    console.log('found friend...')
                    Player.findOneAndUpdate({ steamId: decoded.id}, {$push: { friends: friend._id}}, { new: true })
                    .then(user => {
                        console.log(user)
                        res.json({success: true, message: 'Friend Added', user})
                    })
                    .catch(error => {
                        res.status(401).send({ success: false, message: error })
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.send(err, {message: 'Your friend-to-be doesn\'t exist! LOL'})
                }) 
            }
          })
    }
}

function buildQuery(body) {
    let query = {}
    if (Object.keys(body).length === 0) return query
    // build query
    // if (body.regions.length > 0) {
    //     query['regions'] = {$in: body.regions}
    // }
    // if (body.languages.length > 0) {
    //     query['languages'] = {$in: body.languages}
    // }
    // if (body.comms.length > 0) {
    //     query['comms'] = {$in: body.comms}
    // }
    // if (body.positions.length > 0) {
    //     query['positions'] = {$in: body.positions}
    // }
    if (body.steamName.length > 0) {
        query.steamName = {$regex: body.steamName, $options: 'i'}
    }
    if (body.regions !== null) {
        query.regions = body.regions
    }
    if (body.languages !== null) {
        query.languages = body.languages
    }
    if (body.comms !== null) {
        query.comms = body.comms
    }
    if (body.positions !== null) {
        query.positions = body.positions
    }
    // if (body.mmr.length > 0) {
    //     if (body.mmr.length == 1) {
    //         query['mmr.mmr_estimate'] = { $gte: body.mmr[0].min, $lte: body.mmr[0].max}
    //     } else {
    //         query['$or'] = []
    //         for (let i = 0; i < body.mmr.length; i++) {
    //             query['$or'].push({'mmr.mmr_estimate': {$gte: body.mmr[i].min, $lte: body.mmr[i].max}})
    //         }
    //     }
    // }
    return query
}