import { CreateAssignments } from "../../../../src/modules/Assignments/application/CreateAssingment";
import { AssignmentDataObject } from "../../../../src/modules/Assignments/domain/assignmentInterfaces";
import { MockAssignmentsRepository } from "../../__mocks__/mockAssignmentsRepository";

let mockRepository: MockAssignmentsRepository;
let createAssignment: CreateAssignments;

beforeEach(() => {
    mockRepository = new MockAssignmentsRepository();
    createAssignment = new CreateAssignments(mockRepository);
});
describe("Create Assignment", () => {
    it("Should successfully create a new assignment", async () => {
        const assignmentId = 1;
        const assignment: AssignmentDataObject = {
            id: assignmentId,
            title: "Tarea Test",
            description: "Esta es una tarea de prueba",
            start_date: new Date("2023-10-31"),
            end_date: new Date("2023-11-05"),
            state: "inProgress",
            link: "Enlace",
        };
        mockRepository.createAssignment(assignment);
        await createAssignment.createAssignment(assignment);
        const obtainedAssignment = await mockRepository.getAssignmentById(1);
        expect(obtainedAssignment).toEqual(assignment);
    });
/*
    it("Should handle an exception if the assignment is not found", async () => {
        const obtainedAssignment = await getAssignmentDetail.obtainAssignmentDetail(2);
        expect(obtainedAssignment).toBeNull();
    });

    it("Should handle an exception if an error occurs", async () => {
        mockRepository.getAssignmentById.mockRejectedValue(new Error("Error simulado"));
        await expect(getAssignmentDetail.obtainAssignmentDetail(1)).rejects.toThrow("Error simulado");
    });*/
});
 

