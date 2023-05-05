import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Occupation } from './entities/occupation.entity';
import { CreateClientPolicyDto } from './dto/create-client-policy.dto';
import { ClientPolicy } from './entities/clientPolicy.entity';
import { ClientUser } from './entities/clientUser.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientRepo: Repository<Client>,
    @InjectRepository(ClientPolicy)
    private clientPolicyRepo: Repository<ClientPolicy>,
    @InjectRepository(Occupation)
    private occupationRepo: Repository<Occupation>,
    @InjectRepository(ClientUser)
    private clientUserRepo: Repository<ClientUser>,
  ) {}
  async create(createClientDto: CreateClientDto, user: User) {
    const result = await this.clientRepo.save(createClientDto);
    // After saving to client database
    // Update client user table to link client to user

    await this.clientUserRepo.save({ userId: user.id, clientId: result.id });
    return 'Client successfully added';
  }

  async createClientPolicy(createClientPolicyDto: CreateClientPolicyDto) {
    await this.clientPolicyRepo.save(createClientPolicyDto);
    return 'Client Policy successfully added';
  }

  async findAll(user: User) {
    const result = await this.clientUserRepo.find({
      where: { userId: user.id },
    });
    const clientIds = result.map((value) => {
      return value.clientId;
    });

    return await this.clientRepo.find({ where: { id: In(clientIds) } });

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

  async remove(id: number, user: User) {
    return await this.clientRepo.delete({ id }).then(async (value) => {
      await this.clientUserRepo.delete({ userId: user.id, clientId: id });
      return value;
    });
  }

  async removePolicy(id: number) {
    return await this.clientPolicyRepo.delete({ id }).then((value) => {
      return value;
    });
  }
}
