import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { Vm, CreateVmDto, UpdateVmDto, VmOs, VmStatus } from '../../domain/entities/vm';
import { VmRepository } from '../../domain/repositories/vm-repository';
import { pool } from '../database/mysql';

export class MySQLVmRepository implements VmRepository {
  async findAll(): Promise<Vm[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM vms');
    return rows.map(this.mapRowToVm);
  }

  async findById(id: string): Promise<Vm | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM vms WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return this.mapRowToVm(rows[0]);
  }

  async create(dto: CreateVmDto): Promise<Vm> {
    const id = Math.random().toString(36).substr(2, 9);
    const status = VmStatus.CREATING;
    const createdAt = new Date();

    await pool.query<ResultSetHeader>(
      'INSERT INTO vms (id, name, os, ramGb, cpuCores, diskGb, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, dto.name, dto.os, dto.ramGb, dto.cpuCores, dto.diskGb, status, createdAt],
    );

    return { ...dto, id, status, createdAt };
  }

  async update(id: string, dto: UpdateVmDto): Promise<Vm | null> {
    const fields = Object.keys(dto);
    if (fields.length === 0) return this.findById(id);

    const setClause = fields.map((field) => `${field} = ?`).join(', ');
    const values = Object.values(dto);

    await pool.query<ResultSetHeader>(`UPDATE vms SET ${setClause} WHERE id = ?`, [...values, id]);

    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM vms WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  private mapRowToVm(row: any): Vm {
    return {
      id: row.id,
      name: row.name,
      os: row.os as VmOs,
      ramGb: row.ramGb,
      cpuCores: row.cpuCores,
      diskGb: row.diskGb,
      status: row.status as VmStatus,
      createdAt: new Date(row.createdAt),
    };
  }
}
