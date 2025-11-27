import Admission from "../models/Admission.js";

export const getAllAdmissions = async (req, res) => {
  try {
    const list = await Admission.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
