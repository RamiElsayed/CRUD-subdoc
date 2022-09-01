const { Router } = require('express');
const applicationTags = require("./applicationTags")
const {
  getApplications,
  getSingleApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  addTag,
  removeTag,
} = require('../../controllers/api/apps');

const router = Router();

router.get("/", getApplications);
router.get("/:applicationId", getSingleApplication);
router.post("/", createApplication);
router.put("/:applicationId", updateApplication);
router.delete("/:applicationId", deleteApplication);

router.use("/:applicationId", applicationTags);

// /api/applications
router.route('/').get(getApplications).post(createApplication);

// /api/applications/:applicationId
router
  .route('/:applicationId')
  .get(getSingleApplication)
  .put(updateApplication)
  .delete(deleteApplication);



module.exports = router;
