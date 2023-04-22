import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    try {
      return await this.clientService.create(createClientDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.clientService.findAll();
    } catch (error) {
      return error;
    }
  }

  @Get('/get-all-occupation')
  async getAllOccupation() {
    return await this.clientService.getAllOccupation();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.clientService.findOne(+id);
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    try {
      return await this.clientService.update(+id, updateClientDto);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.clientService.remove(+id);
    } catch (error) {
      return error;
    }
  }
}
