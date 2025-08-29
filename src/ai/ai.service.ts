import { Injectable } from "@nestjs/common";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

@Injectable()
export class AiService {
  private llm: ChatOpenAI;

  constructor() {
    this.llm = new ChatOpenAI({
      model: "gpt-3.5-turbo",
      temperature: 0,
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateSQL(query: string): Promise<string> {
    try {
      const prompt = `Generate optimized PostgreSQL SQL for: ${query}. Return ONLY SQL.`;
      const res = await this.llm.invoke(prompt);
      return res.toString();
    } catch (err) {
      console.error("Error generating SQL:", err);
      return "";
    }
  }

  async generateMongoPipeline(query: string, collection: string): Promise<any[]> {
    try {
      const prompt = `Generate a MongoDB aggregation pipeline for collection "${collection}" 
      based on this request: "${query}". Return ONLY valid JSON array.`;

      const res = await this.llm.invoke(prompt);
      return JSON.parse(res.toString());
    } catch (err) {
      console.error("Error generating MongoDB pipeline:", err);
      return [];
    }
  }
}
