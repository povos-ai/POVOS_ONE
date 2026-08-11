import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkspaceService {
  async findAll() { return []; }
  async findOne(id: string) { return null; }
  async create(data: any) { return data; }
  async update(id: string, data: any) { return data; }
  async delete(id: string) { return { deleted: true }; }
}