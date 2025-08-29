import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class MongoService {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI);
  }

  async runPipeline(collection: string, pipeline: any[]) {
    const db = this.client.db(process.env.MONGO_DB);
    const coll = db.collection(collection);
    return await coll.aggregate([...pipeline, { $limit: 500 }]).toArray();
  }
}