import LogBook_Model from "../models/LogBook_Model.js";

const LogBookController = async (req, res) => {
  try {
    const {
      name,
      address,
      contact,
      purpose,
      leaveTime,
    } = req.body;

    if (
      !name ||
      !address ||
      !contact ||
      !purpose

    ) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
      });
    }

    const visitor = await LogBook_Model.create({
      name,
      address,
      contact,
      purpose,
      leaveTime,
    });

    return res.status(201).json({
      success: true,
      message: "Visitor registered successfully.",
      visitor,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

export default LogBookController