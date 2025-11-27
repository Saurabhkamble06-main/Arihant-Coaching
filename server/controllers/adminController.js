import Admission from "../models/Admission.js";

export const deleteAdmission = async (req, res) => {
  try {
    await Admission.findByIdAndDelete(req.params.id);
    res.json({ msg: "Admission deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAdmission = async (req, res) => {
  try {
    const updated = await Admission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
