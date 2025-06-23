// controllers/reflection.controller.js
const Reflection = require('../models/Reflection');

exports.submitReflection = async (req, res) => {
  try {
    const { userQuestId, text } = req.body;
    const photoUrls = (req.files['photos'] || []).map(file => file.path);
    const audioUrls = (req.files['audio'] || []).map(file => file.path);

    const reflection = new Reflection({
      userQuestId,
      text,
      photos: photoUrls,
      audio: audioUrls
    });

    await reflection.save();
    res.json({ message: 'Reflection submitted', reflection });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit reflection', error: err.message });
  }
};

exports.viewReflections = async (req, res) => {
  try {
    const current = await Reflection.findOne({
      userQuestId: req.params.userQuestId,
    }).populate({
      path: 'userQuestId',
      populate: { path: 'questId', select: 'title' }
    });

    const others = await Reflection.find({
      userQuestId: { $ne: req.params.userQuestId }
    }).populate({
      path: 'userQuestId',
      populate: { path: 'questId', select: 'title' }
    });

    res.json({ current, others });
  } catch (err) {
    res.status(500).json({ message: "Error fetching reflection", error: err.message });
  }
};
