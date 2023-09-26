const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile"); 
const ProfilePost = require("../models/ProfilePost");


router.get("/profiles", (req, res) => {
  res.status(200).json({ message: "API is running perfectly" });
});


router.post("/v1/profile/:uid", async (req, res) => {
  const { uid } = req.params;
  const { name, email, mobile, userprofile, location, desc } = req.body;

  if (!name || !email || !mobile || !userprofile || !location || !desc) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const newProfile = new Profile({
      uid,
      name,
      email,
      mobile,
      userprofile,
      location,
      desc,
    });

    await newProfile.save();

    res.status(201).json({ message: "Profile added successfully", profile: newProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.post("/v2/addpost/:uid", async (req, res) => {
  const { uid } = req.params;
  const { title, price, rating, location, isproduct, score, image } = req.body;

  if (!title || !price || !rating || !location || !isproduct || !score || !image) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const post = new ProfilePost({
      uid,
      title,
      price,
      rating,
      location,
      isproduct,
      score,
      image,
    });

    await post.save();

    res.status(201).json({ message: "Post saved successfully", post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get('/v3/profileview/:uid', async (req, res) => {
  const { uid } = req.params;

  if (!uid) {
    return res.status(401).json({ message: 'You need to pass uid' });
  }

  try {
    const userProfile = await Profile.findOne({ uid });
    const userPost = await ProfilePost.findOne({ uid });

    if (!userProfile ) {
      return res.status(404).json({ message: 'Post Not Found ' });
    }

    

    
    res.status(200).json(userProfile,userPost);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

router.get("/v4/profilepost/:uid", async (req,res)=>{
  const { uid } = req.params;

  if (!uid) {
    return res.status(401).json({ message: 'You need to pass uid' });
  }

  try {
    const userProfile = await ProfilePost.findOne({ uid });

    if (!userProfile) {
      return res.status(404).json({ message: 'User not foun' });
    }

    
    res.status(200).json(userProfile);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }

})


module.exports = router;
