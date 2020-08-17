const express = require('express');
const project = require("./helpers/projectModel")
const action = require("./helpers/actionModel")
const router = express.Router();



router.post('/',  (req, res) => {
    if (!req.body.description || !req.body.notes) {
		return res.status(400).json({
			message: "description and notes for posting",
		})
	}
	action.insert(req.body)
		.then((user) => {
			res.status(201).json(user)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "There was an error while saving the post to the database",
			})
		})
})


router.get('/', (req, res) => {
	action.get()
		.then((users) => {
			res.status(200).json(users)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the posts",
			})
		})
})

router.get('/:id', (req, res) => {
	action.get(req.params.id)
		.then((user) => {
			if (user) {
				res.status(200).json(user)
			} else {
				res.status(404).json({
					message: "Post not found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving a specific post",
			})
		})
})






module.exports = router;
