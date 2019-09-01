const mongoose = require("mongoose")    

mongoose.connect("mongodb://localhost:27017/embed", {useNewUrlParser:true})

const postSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Post = mongoose.model("Post", postSchema)

const userSchema = new mongoose.Schema({
    email: String,
    name : String,
    posts : [postSchema]
})

const User = mongoose.model("User", userSchema)

var newUser = new User({
    name : "Hermione",
    email : "anotherweasley@hogwarts.edu"
})

newUser.posts.push({
    title: "title",
    content : "content"
})

newUser.save((err, user) => {
    {err ? console.log(err) : console.log(user)}
})

User.findOne({name: "Hermione"}, (err,user) => {
    if(err){
        console.log(err)
    }else{
        user.posts.push({
            title: "another title",
            content: "another content"
        })
        user.save((err,user) =>{
            {err ? console.log(err) : console.log(user)} 
        })
    }
})