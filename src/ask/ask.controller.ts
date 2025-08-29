import { Body, Controller, Post } from '@nestjs/common';
import { AskRequestDto } from './dto/ask.dto';
import { AskService } from './ask.service';

@Controller('ask')
export class AskController {
  constructor(private readonly askService: AskService) {}

  @Post()
  async ask(@Body() body: AskRequestDto) {
    return this.askService.getSQL(body.query);
  }
}