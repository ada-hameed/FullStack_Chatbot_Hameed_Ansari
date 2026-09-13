const express = require("express");
const {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
} = require("../controllers/enquiryController");

const router = express.Router();

router.post("/", createEnquiry);

router.get("/", getAllEnquiries);

router.get("/:id", getEnquiryById);

router.patch("/:id", updateEnquiryStatus);

router.delete("/:id", deleteEnquiry);

module.exports = router;