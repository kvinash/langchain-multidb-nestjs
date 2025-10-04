import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('schema_embeddings')
export class SchemaEmbedding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  schema_name: string;

  @Column({ nullable: true })
  description: string;

  @Column('vector', { nullable: false, transformer: {
    to: (value: number[]) => value,
    from: (value: number[]) => value,
  }})
  embedding: number[];
}