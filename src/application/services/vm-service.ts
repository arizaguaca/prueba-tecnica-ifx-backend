import { CreateVmDto, UpdateVmDto, Vm } from '../../domain/entities/vm';
import { VmRepository } from '../../domain/repositories/vm-repository';

export class VmService {
  constructor(private readonly vmRepository: VmRepository) {}

  async getAllVms(): Promise<Vm[]> {
    return this.vmRepository.findAll();
  }

  async getVmById(id: string): Promise<Vm | null> {
    return this.vmRepository.findById(id);
  }

  async createVm(dto: CreateVmDto): Promise<Vm> {
    // Business logic/validations could go here
    return this.vmRepository.create(dto);
  }

  async updateVm(id: string, dto: UpdateVmDto): Promise<Vm | null> {
    return this.vmRepository.update(id, dto);
  }

  async deleteVm(id: string): Promise<boolean> {
    return this.vmRepository.delete(id);
  }
}
