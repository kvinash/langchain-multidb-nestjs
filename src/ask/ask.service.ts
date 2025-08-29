import { Injectable } from "@nestjs/common";
import { AiService } from "../ai/ai.service";

@Injectable()
export class AskService {
  constructor(private readonly ai: AiService) {}

  /**
   * Generate SQL for Postgres
   */
  async getSQL(query: string): Promise<string> {
    try {
      const sql = await this.ai.generateSQL(query);
      return sql;
    } catch (err) {
      console.error("Error in getSQL:", err);
      throw err;
    }
  }

  /**
   * Generate MongoDB aggregation pipeline
   */
  async getMongoPipeline(query: string, collection: string): Promise<any[]> {
    try {
      const pipeline = await this.ai.generateMongoPipeline(query, collection);
      return pipeline;
    } catch (err) {
      console.error("Error in getMongoPipeline:", err);
      throw err;
    }
  }
}
