import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateClientPolicyDto } from './dto/create-client-policy.dto';
import { UpdateClientPolicyDto } from './dto/update-client-policy.dto';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';

@Controller('client')
@UseGuards(JwtAuthGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto, @Request() req) {
    try {
      return await this.clientService.create(createClientDto, req.user);
    } catch (error) {
      return error;
    }
  }

  @Post('policy')
  async createClientPolicy(
    @Body() createClientPolicyDto: CreateClientPolicyDto,
  ) {
    try {
      return await this.clientService.createClientPolicy(createClientPolicyDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  async findAll(@Request() req) {
    try {
      return await this.clientService.findAll(req.user);
    } catch (error) {
      return error;
    }
  }

  @Get('policy/:id')
  async findAllPolicy(@Param('id') id: string) {
    try {
      return await this.clientService.findAllPolicy(+id);
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

  @Put('policy/:id')
  async updatePolicy(
    @Param('id') id: string,
    @Body() updateClientPolicyDto: UpdateClientPolicyDto,
  ) {
    try {
      return await this.clientService.updatePolicy(+id, updateClientPolicyDto);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    try {
      return this.clientService.remove(+id, req.user);
    } catch (error) {
      return error;
    }
  }
  @Delete('policy/:id')
  removePolicy(@Param('id') id: string) {
    try {
      return this.clientService.removePolicy(+id);
    } catch (error) {
      return error;
    }
  }
}
