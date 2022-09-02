const { Router } = require('express');
const applicationTags = require("./applicationTags")
const {
  getApplications,
  getSingleApplication,
  createApplication,
  updateApplication,
  deleteApplication,
} = require('../../controllers/api/apps');

const router = Router();

router.get("/", getApplications);
router.get("/:applicationId", getSingleApplication);
router.post("/", createApplication);
router.put("/:applicationId", updateApplication);
router.delete("/:applicationId", deleteApplication);

router.use("/:applicationId", applicationTags);



module.exports = router;
