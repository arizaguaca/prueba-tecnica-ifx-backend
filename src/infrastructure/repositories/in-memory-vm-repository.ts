import { Vm, VmOs, VmStatus, CreateVmDto, UpdateVmDto } from '../../domain/entities/vm';
import { VmRepository } from '../../domain/repositories/vm-repository';

export class InMemoryVmRepository implements VmRepository {
  private vms: Vm[] = [
    {
      id: '1',
      name: 'Prod-Web-Server',
      os: VmOs.UBUNTU,
      ramGb: 16,
      cpuCores: 4,
      diskGb: 100,
      status: VmStatus.RUNNING,
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Dev-DB-Ubuntu',
      os: VmOs.UBUNTU,
      ramGb: 8,
      cpuCores: 2,
      diskGb: 50,
      status: VmStatus.STOPPED,
      createdAt: new Date(),
    },
    {
      id: '3',
      name: 'Win-Legacy-App',
      os: VmOs.WINDOWS,
      ramGb: 32,
      cpuCores: 8,
      diskGb: 500,
      status: VmStatus.RUNNING,
      createdAt: new Date(),
    },
    {
      id: '4',
      name: 'Linux-Batch-Worker',
      os: VmOs.LINUX,
      ramGb: 4,
      cpuCores: 2,
      diskGb: 20,
      status: VmStatus.CREATING,
      createdAt: new Date(),
    },
    {
      id: '5',
      name: 'Ubuntu-Test-Bench',
      os: VmOs.UBUNTU,
      ramGb: 8,
      cpuCores: 4,
      diskGb: 80,
      status: VmStatus.RUNNING,
      createdAt: new Date(),
    },
  ];

  async findAll(): Promise<Vm[]> {
    return [...this.vms];
  }

  async findById(id: string): Promise<Vm | null> {
    return this.vms.find((vm) => vm.id === id) || null;
  }

  async create(dto: CreateVmDto): Promise<Vm> {
    const newVm: Vm = {
      ...dto,
      id: Math.random().toString(36).substr(2, 9),
      status: VmStatus.CREATING,
      createdAt: new Date(),
    };
    this.vms.push(newVm);
    return newVm;
  }

  async update(id: string, dto: UpdateVmDto): Promise<Vm | null> {
    const index = this.vms.findIndex((vm) => vm.id === id);
    if (index === -1) return null;

    this.vms[index] = { ...this.vms[index], ...dto };
    return this.vms[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.vms.findIndex((vm) => vm.id === id);
    if (index === -1) return false;

    this.vms.splice(index, 1);
    return true;
  }
}
