const express = require('express');
const project = require("./helpers/projectModel")
const action = require("./helpers/actionModel")
const router = express.Router();



router.post('/',  (req, res) => {
    if (!req.body.description || !req.body.name) {
		return res.status(400).json({
			message: "Please provide title and contents for the post",
		})
	}
	project.insert(req.body)
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

router.post("/:id/actions", (req, res) => {  

    if (!req.body.description || !req.body.notes || !req.params.project_id) {
		return res.status(400).json({
			message: "Please provide title and contents for the post",
		})
	}
	action.insert({...req.body, project_id: req.params.project_id})
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
	project.get()
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
	project.get(req.params.id)
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

router.get("/:id/actions", (req, res) => {
    project.getProjectActions(req.params.id)
    .then((posts) => {
        res.json(posts)

    })
    .catch((error) => {
        console.log(error)
			res.status(500).json({
				message: "Error retrieving post comments",
			})
    })  
})  

router.delete('/:id', (req, res) => {
	project.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The post has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The postcould not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error removing the the post",
			})
		})
})

router.put("/:id", (req, res) => {
    if(!req.params.id){
        return  res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    }
	if (!req.body.description || !req.body.name) {
		return res.status(400).json({
			message: "Missing data",
		})
	}

	project.update(req.params.id, req.body)
		.then((user) => {
			if (user) {
				res.status(200).json(user)
			} else {
				res.status(405).json({
					message: "The post could not be updated",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "The post information could not be modified.",
			})
		})
})





module.exports = router;
