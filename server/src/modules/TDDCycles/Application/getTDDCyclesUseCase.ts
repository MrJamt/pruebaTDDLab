import { IDBCommitsRepository } from "../Domain/IDBCommitsRepository";
import { TDDCycleDataObject } from "../Domain/TDDCycleDataObject";
import { IGithubRepository } from "../Domain/IGithubRepository";
export class GetTDDCyclesUseCase {
  private dbCommitRepository: IDBCommitsRepository;
  private githubRepository: IGithubRepository;

  constructor(
    dbCommitRepository: IDBCommitsRepository,
    githubRepository: IGithubRepository
  ) {
    this.dbCommitRepository = dbCommitRepository;
    this.githubRepository = githubRepository;
  }
  async execute(owner: string, repoName: string) {
    try {
      const commitsFromGithub = await this.githubRepository.getCommits(owner, repoName);
      let commitsToSave = commitsFromGithub;
      if ((await this.dbCommitRepository.repositoryExists(owner, repoName))) {
        commitsToSave = await this.dbCommitRepository.getCommitsNotSavedInDB(owner, repoName, commitsFromGithub);
      }
      const commitsInfoForTDDCycles = await this.githubRepository.getCommitsInforForTDDCycle(owner, repoName, commitsToSave);
      await this.saveCommitsToDB(owner, repoName, commitsInfoForTDDCycles);
      const commits = await this.dbCommitRepository.getCommits(owner, repoName);
      return commits;
    } catch (error) {
      console.error("Error executing TDDCycles Use case:", error);
      throw error;
    }
  }

  async saveCommitsToDB(
    owner: string,
    repoName: string,
    newCommits: TDDCycleDataObject[]
  ) {
    try {
        await Promise.all(
        newCommits.map(commit => this.dbCommitRepository.saveCommit(owner, repoName, commit))
        );
    } catch (error) {
      console.error("Error updating the commit table in the database:", error);
    }
  }
}
