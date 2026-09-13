const pool = require("../database");

const createEnquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      user_type,
      service_interest,
      message,
    } = req.body;

    // Required field validation
    if (!name || !email || !phone || !user_type) {
      return res.status(400).json({
        message: "Name, email, phone and user type are required.",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address.",
      });
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        message: "Phone number must be exactly 10 digits.",
      });
    }

    // User type validation
    const allowedUserTypes = ["Student", "Customer", "Other"];

    if (!allowedUserTypes.includes(user_type)) {
      return res.status(400).json({
        message: "User type must be Student, Customer or Other.",
      });
    }

    // Insert enquiry into database
    const result = await pool.query(
      `INSERT INTO enquiries
       (name, email, phone, user_type, service_interest, message)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        name,
        email,
        phone,
        user_type,
        service_interest || null,
        message || null,
      ]
    );

    res.status(201).json({
      message: "Enquiry created successfully.",
      enquiry: result.rows[0],
    });
  } catch (error) {
    console.error("Create enquiry error:", error.message);

    res.status(500).json({
      message: "Unable to create enquiry.",
    });
  }
};


const getAllEnquiries = async (req, res) => {
  try {
    const { search, user_type } = req.query;

    let query = "SELECT * FROM enquiries";
    let values = [];
    let conditions = [];

    // Search by name, email or phone
    if (search) {
      values.push(`%${search}%`);

      conditions.push(`
        (
          name ILIKE $${values.length}
          OR email ILIKE $${values.length}
          OR phone ILIKE $${values.length}
        )
      `);
    }

    // Filter by user type
    if (user_type) {
      values.push(user_type);

      conditions.push(`user_type = $${values.length}`);
    }

    // Add WHERE conditions
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    // Latest enquiries first
    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);

    res.status(200).json({
      enquiries: result.rows,
    });
  } catch (error) {
    console.error("Get enquiries error:", error.message);

    res.status(500).json({
      message: "Unable to fetch enquiries.",
    });
  }
};


const getEnquiryById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM enquiries WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Enquiry not found.",
      });
    }

    res.status(200).json({
      enquiry: result.rows[0],
    });
  } catch (error) {
    console.error("Get enquiry error:", error.message);

    res.status(500).json({
      message: "Unable to fetch enquiry.",
    });
  }
};


const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.body || !req.body.status) {
      return res.status(400).json({
        message: "Status is required.",
      });
    }

    const { status } = req.body;

    const allowedStatuses = [
      "New",
      "Contacted",
      "In Progress",
      "Closed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status.",
      });
    }

    const result = await pool.query(
      `UPDATE enquiries
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Enquiry not found.",
      });
    }

    res.status(200).json({
      message: "Enquiry status updated successfully.",
      enquiry: result.rows[0],
    });
  } catch (error) {
    console.error("Update enquiry error:", error.message);

    res.status(500).json({
      message: "Unable to update enquiry.",
    });
  }
};


const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM enquiries WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Enquiry not found.",
      });
    }

    res.status(200).json({
      message: "Enquiry deleted successfully.",
      enquiry: result.rows[0],
    });
  } catch (error) {
    console.error("Delete enquiry error:", error.message);

    res.status(500).json({
      message: "Unable to delete enquiry.",
    });
  }
};


module.exports = {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
};