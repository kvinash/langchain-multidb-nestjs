import { Injectable } from '@nestjs/common';
import { ChartType } from '../ask/dto/ask.dto';

@Injectable()
export class VizService {
  makeChart(rows: any[], type: ChartType = ChartType.AUTO) {
    if (!rows || rows.length === 0) return null;
    const keys = Object.keys(rows[0]);
    if (keys.length < 2) return null;

    const x = keys[0];
    const y = keys[1];

    return {
      type,
      x,
      y,
      data: rows.map(r => ({ [x]: r[x], [y]: r[y] })),
    };
  }
}