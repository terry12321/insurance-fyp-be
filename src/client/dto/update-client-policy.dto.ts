import { PartialType } from '@nestjs/mapped-types';
import { CreateClientPolicyDto } from './create-client-policy.dto';

export class UpdateClientPolicyDto extends PartialType(CreateClientPolicyDto) {}
