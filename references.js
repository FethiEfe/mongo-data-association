const mongoose = require("mongoose")    

mongoose.connect("mongodb://localhost:27017/references", {useNewUrlParser:true})

const postSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Post = mongoose.model("Post", postSchema)

const userSchema = new mongoose.Schema({
    email: String,
    name : String,
    posts : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
})

const User = mongoose.model("User", userSchema)

User.create({
    email: "bob@gmail.com",
    name: "Bob Belcher"
}, (err, user) => {
    {err ? console.log(err) : console.log(user)}
})

Post.create({
    title: "How to use object reference 2",
    content: "follow me"
}, (err, post) => {
    User.findOne({email : "bob@gmail.com"} , (err, foundUser) => {
        if(err){
            console.log(err)
        }else{
            foundUser.posts.push(post);
            foundUser.save((err,data) => {
                {err? console.log(err) : console.log(data)}
            })
        }
    })
})

User.findOne({email: "bob@gmail.com"}).populate("posts").exec((err, data) => {
    {err ? console.log(err) : console.log(data)}
})