import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Occupation } from './entities/occupation.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientRepo: Repository<Client>,
    @InjectRepository(Occupation)
    private occupationRepo: Repository<Occupation>,
  ) {}
  async create(createClientDto: CreateClientDto) {
    await this.clientRepo.save(createClientDto);
    return 'Client successfully added';
  }

  findAll() {
    return `This action returns all client`;
  }

  async getAllOccupation() {
    return await this.occupationRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
