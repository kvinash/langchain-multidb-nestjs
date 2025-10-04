import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserConnectionsService } from './user-connections.service';
import { CreateUserConnectionDto } from './dto/create-user-connection.dto';
import { UpdateUserConnectionDto } from './dto/update-user-connection.dto';

@Controller('user-connections')
export class UserConnectionsController {
  constructor(private readonly userConnectionsService: UserConnectionsService) {}

  @Post()
  create(@Body() createUserConnectionDto: CreateUserConnectionDto) {
    return this.userConnectionsService.create(createUserConnectionDto);
  }

  @Get()
  findAll() {
    return this.userConnectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userConnectionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserConnectionDto: UpdateUserConnectionDto) {
    return this.userConnectionsService.update(+id, updateUserConnectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userConnectionsService.remove(+id);
  }
}
