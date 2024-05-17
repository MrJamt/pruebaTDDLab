import { Pool } from "pg";
import config from "../../../config/db";
import { SubmissionCreationObect, SubmissionDataObect, SubmissionUpdateObject } from "../Domain/Submission";

interface QueryResult {
    exists: boolean;
}

const pool = new Pool(config);

class SubmissionRepository{
    public async executeQuery(query: string, values?: any[]): Promise<any[]> {
        const client = await pool.connect();
        try {
          const result = await client.query(query, values);
          return result.rows;
        } finally {
          client.release();
        }
    }
    public mapRowToSubmissions(row: any): SubmissionDataObect{
        return{
            id: row.id,
            assignmentid: row.assignmentid,
            userid: row.userid,
            status: row.status,
            repository_link: row.repository_link,
            start_date: row.start_date,
            end_date: row.end_date,
            comment: row.comment,
        }
    }
    async CreateSubmission(Submission: SubmissionCreationObect): Promise<SubmissionCreationObect> {
        const query = "INSERT INTO submissions (assignmentid,userid,status,repository_link,start_date) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const values = [Submission.assignmentid, Submission.userid, Submission.status, Submission.repository_link, Submission.start_date];
        const rows = await this.executeQuery(query, values);
        return this.mapRowToSubmissions(rows[0]);
    }
    async ObtainSubmissions(): Promise<SubmissionDataObect[]> {
        const query = "SELECT * FROM submissions";
        const rows =await this.executeQuery(query);
        return rows.map((row) => this.mapRowToSubmissions(row));
    }

    async UpdateSubmission(id: number, updatedSubmission: SubmissionUpdateObject): Promise<SubmissionUpdateObject | null> {
        const { status, repository_link, start_date, end_date, comment } = updatedSubmission;
        const query = "UPDATE submissions SET status = $1, repository_link = $2, start_date = $3, end_date = $4, comment = $5 WHERE id = $6 RETURNING *";
        const values = [
            status,
            repository_link,
            start_date,
            end_date,
            comment,
            id
        ];
        const rows = await this.executeQuery(query, values);
        if (rows.length === 1) {
            return this.mapRowToSubmissions(rows[0]);
        }
        return null;
    }

    async deleteSubmission(id: number): Promise<void> {
        const query = "DELETE FROM submissions WHERE id = $1";
        const values = [id];
        await this.executeQuery(query, values);
    }

    async assignmentidExistsForSubmission(assignmentid: number): Promise<boolean> {
        const query = "SELECT EXISTS (SELECT 1 FROM assignments WHERE id = $1)";
        const result: QueryResult[] = await this.executeQuery(query, [assignmentid]);
        return result[0].exists;
    }

    async useridExistsForSubmission(userid: number): Promise<boolean> {
        const query = "SELECT EXISTS (SELECT 1 FROM userstable WHERE id = $1)";
        const result: QueryResult[] = await this.executeQuery(query, [userid]);
        return result[0].exists;
    }
}

export default SubmissionRepository;