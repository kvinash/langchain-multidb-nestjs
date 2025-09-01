import { Injectable } from "@nestjs/common";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

@Injectable()
export class AiService {
  private llm: ChatOpenAI;

  constructor() {
    this.llm = new ChatOpenAI({
      configuration: {
        baseURL: "https://openrouter.ai/api/v1",
        defaultHeaders: {
          "HTTP-Referer": "https://localhost:3000", // Your site URL
          "X-Title": "Langchain MultiDB NestJS", // Your site name
        },
      },
      modelName: "openai/gpt-3.5-turbo", // Prefix with 'openai/' when using OpenRouter
      temperature: 0,
      openAIApiKey: process.env.OPENROUTER_API_KEY,
    });
  }

  async generateSQL(query: string): Promise<any> {
    try {
    
      const prompt = `Generate optimized PostgreSQL SQL for: ${query}. Return ONLY SQL.`;
      const res = await this.llm.invoke(prompt);
      console.log("Generated SQL:", JSON.stringify(res, null, 2));
      return res
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
      return ;
    } catch (err) {
      console.error("Error generating MongoDB pipeline:", err);
      return [];
    }
  }
}
