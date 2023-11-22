import express from "express";
import { DBCommitRepository } from "../modules/TDDCycles/Repositories/DBCommitsRepository";
import { JobRepository } from "../modules/TDDCycles/Repositories/TDDCyclesJobsRepository";
import { GithubRepository } from "../modules/TDDCycles/Repositories/TDDCyclesGithubRepository";
import TDDCyclesController from "../controllers/TDDCycles/TDDCyclesController";

// Create instances of your repositories
const dbCommitsRepository = new DBCommitRepository();
const jobsRepository = new JobRepository();
const githubRepository = new GithubRepository();

// Create an instance of your controller
const tddCyclesController = new TDDCyclesController(
  dbCommitsRepository,
  jobsRepository,
  githubRepository
);

// Create a new router to handle the TDDCycles routes
const TDDCyclesRouter = express.Router();

// Get all commits from a repository in Github (TDD Cycles)
TDDCyclesRouter.get(
  "/commits",
  async (req, res) => await tddCyclesController.getTDDCycles(req, res)
);

// Get all test results from a repository in Github
TDDCyclesRouter.get(
  "/jobs",
  async (req, res) => await tddCyclesController.getTestResults(req, res)
);

export default TDDCyclesRouter;
