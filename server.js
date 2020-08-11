const express = require("express")
const db = require("./database.js")

const server = express()
server.use(express.json())

server.get("/", (req, res) => {
    res.json({ message: "Hello, friends (:" })
})

server.listen(3000, () => {
    console.log("server listening on port 3000")
})

//CRUD - get
server.get("/api/users", (req, res) => {
    const users = db.getUsers()
    if (users) {
        res.json(users)
    } else {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        })
    }
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)

    if (user) {
        res.json(user)
    } else if (!user) {
        res.status(404).json({
            errorMessage: "The user with the specified ID does not exist."
        })
    } else {
        res.status(500).json({
            errorMessage: "The user information could not be retrieved."
        })
    }
    })

//CRUD - post (creation)
server.post("/api/users", (req, res) => {
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    })

    if (newUser) {
        res.status(201).json(newUser);
    } else {
        res.status(500).json({
            errorMessage: "There was an error while saving the user to the database"
        })
    }

    if(!req.body.name || !req.body.bio) {
        return res.status(400).json({
            message: "Please provide name and bio for the user."
        })
    }
});

//CRUD - delete
server.delete("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        db.deleteUser(req.params.id)
        res.status(204).end() /*204 means success but we have nothing to return */
    } else if (!user) {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        }) 
    } else {
        res.status(500).json({
            errorMessage: "The user could not be removed."
        })
    }
})

//CRUD - put
server.put("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }

    if (user) {
        const updatedUser = db.updateUser(req.params.id, {
            name: req.body.name,
            bio: req.body.bio
        })
        res.status(200).json(updatedUser)
    } else if (!user) {
        res.status(404).json({
            errorMessage: "The user with the specified ID does not exist."
        })
    } else {
        res.status(500).json({
            errorMessage: "The user information could not be modified."
        })
    }
})