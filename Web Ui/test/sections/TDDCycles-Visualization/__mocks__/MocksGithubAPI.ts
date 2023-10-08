import { GithubAPIRepository } from "../../../../src/TDDCycles-Visualization/domain/GithubAPIRepositoryInterface";
import { mockCommitData } from "../__mocks__/dataTypeMocks/commitData";

export class MockGithubAPI implements GithubAPIRepository {
  obtainCommitsOfRepo = jest.fn(async () => {
    return [mockCommitData];
  });
  obtainCommitsFromSha = jest.fn(async () => {
    return mockCommitData;
  });
  obtainRunsOfGithubActions = jest.fn(async () => {
    return {};
  });
  obtainJobsOfACommit = jest.fn(async () => {
    return {};
  });
}