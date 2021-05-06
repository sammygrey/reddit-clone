const Post = require("../models/post");
const mongoose = require("mongoose");

module.exports = (app) => {
  // CREATE
  app.post("/new/post", (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    });
  });
  // VIEW ALL
  app.get("/", (req, res) => {
    Post.find({})
      .lean()
      .then((posts) => {
        res.render("posts-index", { posts });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  // LOOK UP THE POST
  app.get("/posts/:id", function (req, res) {
    console.log(req.params.id);
    Post.findById(mongoose.Types.ObjectId(req.params.id))
      .lean()
      .then((post) => {
        res.render("posts-show", { post });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
};