import { Vm, CreateVmDto, UpdateVmDto } from '../entities/vm';

export interface VmRepository {
  findAll(): Promise<Vm[]>;
  findById(id: string): Promise<Vm | null>;
  create(vm: CreateVmDto): Promise<Vm>;
  update(id: string, vm: UpdateVmDto): Promise<Vm | null>;
  delete(id: string): Promise<boolean>;
}
