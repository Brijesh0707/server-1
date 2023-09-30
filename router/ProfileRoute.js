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
  const { title, price, rating, location, isproduct, score, image ,category} = req.body;

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
      category,
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
  

    if (!userProfile ) {
      return res.status(404).json({ message: 'Post Not Found ' });
    }

    

    
    res.status(200).json(userProfile);
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
    const userProfile = await ProfilePost.find({ uid });

    if (!userProfile) {
      return res.status(404).json({ message: 'User not foun' });
    }

    
    res.status(200).json(userProfile);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }

})


router.delete("/v5/profile/:uid", async (req, res) => {
  const { uid } = req.params;

  if (!uid) {
    return res.status(400).json({ message: "UID is required" });
  }

  try {
    const deletedProfile = await Profile.findOneAndRemove({ uid });

    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    
    await ProfilePost.deleteMany({ uid });

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.delete("/v6/postdelete/:uid/:postId", async (req, res) => {
  const { uid, postId } = req.params;

  if (!uid || !postId) {
    return res.status(400).json({ message: "UID and Post ID are required" });
  }

  try {
  
    const profile = await Profile.findOne({ uid: uid });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const deletedPost = await ProfilePost.findOneAndRemove({ _id: postId, uid: uid });

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/v7/updateprofile/:uid", async (req, res) => {
  const { uid } = req.params;
  const updateData = req.body;

  if (!uid) {
    return res.status(400).json({ message: "UID is required" });
  }

  try {
   
    const updatedProfile = await Profile.findOneAndUpdate({ uid: uid }, updateData, {
      new: true, 
    });

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(updatedProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
