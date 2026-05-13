import { Request, Response, NextFunction } from 'express';
import { VmService } from '../../application/services/vm-service';
import { MySQLVmRepository } from '../../infrastructure/repositories/mysql-vm-repository';
import { AppError } from '../middlewares/error-handler';
import { VmOs, VmStatus } from '../../domain/entities/vm';
import { SocketService } from '../../infrastructure/socket/socket-service';

export class VmController {
  private vmService: VmService;

  constructor() {
    const vmRepository = new MySQLVmRepository();
    this.vmService = new VmService(vmRepository);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const vms = await this.vmService.getAllVms();
      res.status(200).json(vms);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, os, ramGb, cpuCores, diskGb } = req.body;

      if (!name || !os || ramGb === undefined || cpuCores === undefined || diskGb === undefined) {
        throw new AppError('Missing required fields: name, os, ramGb, cpuCores, diskGb');
      }

      if (!Object.values(VmOs).includes(os as VmOs)) {
        throw new AppError(`Invalid OS. Allowed: ${Object.values(VmOs).join(', ')}`);
      }

      // 1. Create VM (Initial status will be 'Creating' by repository default)
      const newVm = await this.vmService.createVm({
        name,
        os: os as VmOs,
        ramGb: Number(ramGb),
        cpuCores: Number(cpuCores),
        diskGb: Number(diskGb),
      });

      // 2. Emit global update event
      SocketService.emit('vm_update', { action: 'create', vm: newVm });

      // 3. Simulate "Creating" process (5 seconds)
      setTimeout(async () => {
        try {
          const updatedVm = await this.vmService.updateVm(newVm.id, { status: VmStatus.RUNNING });
          if (updatedVm) {
            SocketService.emit('vm_update', { action: 'status_change', vm: updatedVm });
          }
        } catch (error) {
          console.error('[socket]: Error updating VM status after timeout:', error);
        }
      }, 5000);

      res.status(201).json(newVm);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as { id: string };
      const { status, name, os, ramGb, cpuCores, diskGb } = req.body;

      const updatedVm = await this.vmService.updateVm(id, {
        status,
        name,
        os,
        ramGb,
        cpuCores,
        diskGb,
      });

      if (!updatedVm) {
        throw new AppError('VM not found', 404, 'Not Found');
      }

      // Emit update event
      SocketService.emit('vm_update', { action: 'update', vm: updatedVm });

      res.status(200).json(updatedVm);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as { id: string };
      const deleted = await this.vmService.deleteVm(id);

      if (!deleted) {
        throw new AppError('VM not found', 404, 'Not Found');
      }

      // Emit global update event
      SocketService.emit('vm_update', { action: 'delete', id });

      res.status(200).json({ message: 'VM deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
