import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum SourceType {
  POSTGRES = 'postgres',
  MONGODB = 'mongodb',
}

export enum ChartType {
  AUTO = 'auto',
  BAR = 'bar',
  LINE = 'line',
  PIE = 'pie',
}

export class AskRequestDto {
  @IsString()
  query: string;

  @IsOptional()
  @IsEnum(SourceType)
  force_source?: SourceType;

  @IsOptional()
  @IsEnum(ChartType)
  chart_type: ChartType = ChartType.AUTO;
}