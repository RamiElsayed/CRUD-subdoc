const { Application, User } = require("../../models");

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({});
    return res.json({ success: true, data: applications });
  } catch (error) {
    console.log(`[ERROR]: Failed to get all applications | ${error.message}`);
  }
};
const getSingleApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.applicationId);
    if (!application) {
      return res.status(404).json({ success: false });
    }
    return res.json({ success: true, data: application });
  } catch (error) {
    console.log(`[ERROR]: Failed to get application | ${error.message}`);
  }
};
// TODO: Add comments to the functionality of the createApplication method
const createApplication = async (req, res) => {
  try {
    const application = await Application.create(req.body);

    const user = await User.findByIdAndUpdate(
      req.body.userId,
      {
        $addToSet: { applications: application.get("_id") },
      },
      {
        new: true,
      }
    );
    if (!user) {
      return res.status(404).json({ success: false });
    }
    return res.json({ success: true, data: user });
  } catch (error) {
    console.log(`[ERROR]: Failed to create application | ${error.message}`);
  }
};
// TODO: Add comments to the functionality of the updateApplication method
const updateApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.body.applicationId,
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!application) {
      return res.status(404).json({ success: false });
    }
    return res.json({ success: true, data: application });
  } catch (error) {
    console.log(`[ERROR]: Failed to update application | ${error.message}`);
  }
};
// TODO: Add comments to the functionality of the deleteApplication method
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(
      req.body.applicationId
    );
    if (!application) {
      return res.status(404).json({ success: false });
    }

    await User.find({
      applications: {
        $in: [req.params.applicationId],
      },
    }).update({ $pull: { applications: req.params.applicationId } });

    return res.json({ success: true });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete application | ${error.message}`);
  }
};
// TODO: Add comments to the functionality of the addTag method
const addTag = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.applicationId,
      { $addToSet: { tags: req.body } },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!application) {
      return res.status(404).json({ success: false });
    }
    return res.json({ success: true, data: application });
  } catch (error) {
    console.log(`[ERROR]: Failed to add tag to application | ${error.message}`);
  }
};
// TODO: Add comments to the functionality of the addTag method
const removeTag = async (req, res) => {
  try {
    const application = await Application.findByIdAndRemove(
      req.params.applicationId,
      { $pull: { tags: { tagId: req.params.tagId } } },
      { $addToSet: { tags: req.body } },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!application) {
      return res.status(404).json({ success: false });
    }
    return res.json({ success: true, data: application });
  } catch (error) {
    console.log(`[ERROR]: Failed to add tag to application | ${error.message}`);
  }
};

module.exports = {
  getApplications,
  getSingleApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  addTag,
  removeTag,
};
