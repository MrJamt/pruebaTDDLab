import express from "express";
import AssignmentController from "../controllers/assignments/assignmentController"; // Import your controller class

const assignmentController = new AssignmentController(); // Create an instance of your controller

const assignmentsRouter = express.Router();

// Create a new assignment
assignmentsRouter.post(
  "/",
  async (req, res) => await assignmentController.createAssignment(req, res)
);

// Retrieve all assignments
assignmentsRouter.get(
  "/",
  async (req, res) => await assignmentController.getAssignments(req, res)
);

// Retrieve a specific assignment by ID
assignmentsRouter.get(
  "/:id",
  async (req, res) => await assignmentController.getAssignmentById(req, res)
);

// Update an assignment by ID
assignmentsRouter.put(
  "/:id",
  async (req, res) => await assignmentController.updateAssignment(req, res)
);

// Delete an assignment by ID
assignmentsRouter.delete(
  "/:id",
  async (req, res) => await assignmentController.deleteAssignment(req, res)
);

export default assignmentsRouter;
