import DeleteSubmission from "../../../../src/modules/Submissions/Aplication/DeleteSubmissionUseCase";
import { getSubmissionRepositoryMock } from "../../../__mocks__/submissions/repositoryMock";

const submissionRepositoryMock = getSubmissionRepositoryMock();
let deleteSubmisison: DeleteSubmission;

beforeEach(() => {
    deleteSubmisison = new DeleteSubmission(submissionRepositoryMock);
});

describe("Delete assignment", () => {
  
    it("should delete a submission successfully", async () => {
      const submissionId = 12345;
      submissionRepositoryMock.deleteSubmission.mockResolvedValueOnce(undefined);
      await expect(deleteSubmisison.execute(submissionId)).resolves.toBeUndefined();
      expect(submissionRepositoryMock.deleteSubmission).toHaveBeenCalledWith(submissionId);
    });
});
  
  