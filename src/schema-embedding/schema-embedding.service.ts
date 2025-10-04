import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchemaEmbedding } from './entities/schema-embedding.entity';

@Injectable()
export class SchemaEmbeddingService {
  constructor(
    @InjectRepository(SchemaEmbedding)
    private readonly schemaEmbeddingRepo: Repository<SchemaEmbedding>,
  ) {}

  async create(data: Partial<SchemaEmbedding>): Promise<SchemaEmbedding> {
    return this.schemaEmbeddingRepo.save(data);
  }

  async findAll(): Promise<SchemaEmbedding[]> {
    return this.schemaEmbeddingRepo.find();
  }

  async findById(id: number): Promise<SchemaEmbedding> {
    return this.schemaEmbeddingRepo.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<SchemaEmbedding>): Promise<void> {
    await this.schemaEmbeddingRepo.update(id, data);
  }

  async remove(id: number): Promise<void> {
    await this.schemaEmbeddingRepo.delete(id);
  }
}