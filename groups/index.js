var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var Sequelize = require('sequelize');
var Room = require('../models/room.js');
var Message = require('../models/message.js');


router.get('/room', function(req,res,next) {
	Room.findAll({})
	.then(function(rooms) {
		res.json(rooms)
	})
})


router.get("/:id", function(req,res,next) {
	Room.findOne({
		where : {
			id: req.params.id
		}
	})
		.then(function(room) {
			Message.findAll({
				where : {
					roomId : room.id
				}
			})
			.then(function(messages) {
				console.log(messages)
				res.send([messages,room])
			})
			
		})
})


router.post("/room", function(req,res,next) {
	Room.create({
		name: req.body.name
	})
	.then(function(room) {
		res.send(room)
	})
})
router.post('/message/:name',function(req,res,next) {
	console.log("HELLO",req.body)
	Message.create({
		content:req.body.content
	})
	.then(function(message) {
		Room.findOne({
			where : {
				name : req.params.name
			}
		}).then(function(room) {
			message.setRoom(room.id)
			.then(function(message) {
				res.send(message)
				console.log("it works")
			})
		})
		
	})
})




module.exports = router