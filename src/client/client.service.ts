import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Occupation } from './entities/occupation.entity';
import { CreateClientPolicyDto } from './dto/create-client-policy.dto';
import { ClientPolicy } from './entities/clientPolicy.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientRepo: Repository<Client>,
    @InjectRepository(ClientPolicy)
    private clientPolicyRepo: Repository<ClientPolicy>,
    @InjectRepository(Occupation)
    private occupationRepo: Repository<Occupation>,
  ) {}
  async create(createClientDto: CreateClientDto) {
    await this.clientRepo.save(createClientDto);
    return 'Client successfully added';
  }

  async createClientPolicy(createClientPolicyDto: CreateClientPolicyDto) {
    await this.clientPolicyRepo.save(createClientPolicyDto);
    return 'Client Policy successfully added';
  }

  async findAll() {
    return await this.clientRepo.find();
    // return `This action returns all client`;
  }

  async findAllPolicy(id: number) {
    return await this.clientPolicyRepo.findBy({ clientId: id });
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

  async updatePolicy(id: number, updateClientDto: UpdateClientDto) {
    return await this.clientPolicyRepo.update(id, updateClientDto);
  }

  async removePolicy(id: number) {
    return await this.clientPolicyRepo.delete({ id }).then((value) => {
      return value;
    });
  }
}
