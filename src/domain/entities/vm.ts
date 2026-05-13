export enum VmOs {
  WINDOWS = 'Windows',
  LINUX = 'Linux',
  UBUNTU = 'Ubuntu',
}

export enum VmStatus {
  RUNNING = 'Running',
  STOPPED = 'Stopped',
  CREATING = 'Creating',
}

export interface Vm {
  id: string;
  name: string;
  os: VmOs;
  ramGb: number;
  cpuCores: number;
  diskGb: number;
  status: VmStatus;
  createdAt: Date;
}

export type CreateVmDto = Omit<Vm, 'id' | 'createdAt' | 'status'>;
export type UpdateVmDto = Partial<CreateVmDto> & { status?: VmStatus };
