const express = require("express");
const Profile = require("../models/Profile");
const Request = require("../models/Request");

const router = express.Router();

router.post("/r1/request/:suid/:ruid", async (req, res) => {
  const { suid, ruid } = req.params;

  const senderProfile = await Profile.findOne({ uid: suid });
  const receiverProfile = await Profile.findOne({ uid: ruid });

  if (!senderProfile || !receiverProfile) {
    return res.status(401).json({ message: "Both sender and receiver profiles must exist." });
  }

  try {
    const newRequest = new Request({
      sender: suid,
      receiver: ruid,
    });

    await newRequest.save();
    res.status(201).json({ message: "Request sent successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

router.post("/r2/accept-request/:requestId", async (req, res) => {
  const requestId = req.params.requestId;

  try {
    const request = await Request.findById(requestId);
    console.log(request);

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    if (request.status === "accepted") {
      return res.status(400).json({ message: "Request has already been accepted." });
    }

    const receiverProfile = await Profile.findOne({ uid: request.receiver });

    if (!receiverProfile) {
      return res.status(404).json({ message: "Receiver profile not found." });
    }
    request.mobile = receiverProfile.mobile;
    request.status = "accepted";
    await request.save();

    res.json({ message: "Request accepted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

router.get("/r3/checkrequest/:uid", async (req, res) => {
    const { uid } = req.params;
    try {
      const requests = await Request.find({
        $or: [{ sender: uid }, { receiver: uid }],
      });
  
      if (!requests || requests.length === 0) {
        res.status(404).json({ message: "No matching requests found." });
      } else {
        res.status(200).json(requests);
      }
    } catch (err) {
      res.status(500).json({ message: "Server error." });
    }
  });

module.exports = router;
