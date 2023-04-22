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

  async findAll() {
    return await this.clientRepo.find();
    // return `This action returns all client`;
  }

  async getAllOccupation() {
    return await this.occupationRepo.find();
  }

  async findOne(id: number) {
    return await this.clientRepo.findOneBy({ id: id });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    return await this.clientRepo.update(id, updateClientDto);
  }

  async remove(id: number) {
    return await this.clientRepo.delete({ id }).then((value) => {
      return value;
    });
  }
}
