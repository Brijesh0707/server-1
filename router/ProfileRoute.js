
const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile"); 

router.get("/profiles", (req, res) => {
  res.status(200).json({ message: "API RUN PERFECTLY" });
});


router.post("/v1/profile/:uid", async (req, res) => {
  const { uid } = req.params;
  const { name, email, mobile, userprofile, location, desc} = req.body;

  if (!name || !email || !mobile || !userprofile || !location || !desc ) {
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





module.exports = router;
