const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Job Model
const Job = require("../../models/Job.model");

//@route    GET api/jobs
//@desc     Get All Jobs
//@access   Public
router.get("/", (req, res) => {
  Job.find()
    .sort({ created_date: -1 })
    .then(jobs => res.json(jobs))
    .catch(err => res.json(err));
});

//@route    POST api/jobs
//@desc     Create a job
//@access   Private
router.post("/", auth, (req, res) => {
  let newJob = new Job(req.body);
  console.log(`value in jobs.route.js`, newJob);
  newJob
    .save()
    .then(job => {
      res.json(job);
    })
    .catch(err => res.json(err));
});

//@route    DELETE api/jobs
//@desc     delete a job
//@access   Private
router.delete("/:id", auth, (req, res) => {
  Job.findById(req.params.id)
    .then(job => {
      job.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ success: false }));
});

//@route    GET api/jobs
//@desc     GET a job
//@access   Public
router.get("/:id", auth, (req, res) => {
  Job.findById(req.params.id)
    .then(job => {
      res.json(job);
    })
    .catch(err => res.status(404).json({ success: false }));
});

//@route    POST api/jobs
//@desc     Update a job
//@access   Private
router.post("/update:id", auth, (req, res) => {
  Job.findById(req.params.id)
    .then(job => {
      if (!job) {
        res.status(400).send("Job data is not found");
      } else {
        let updateJob = new Job(req.body);

        updateJob
          .save()
          .then(job => {
            res.json(job);
          })
          .catch(err => {
            es.json(err);
          });
      }
    })
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
