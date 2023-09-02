/* eslint-disable no-unused-vars */

export interface Repository<U extends { id: unknown }> {
    getAll(): Promise<U[]>;
    getById(id: U['id']): Promise<U>;
    search?({ key, value }: { key: string; value: unknown }): Promise<U[]>;
    create(newData: Omit<U, 'id'>): Promise<U>;
    update(id: U['id'], newData: Partial<U>): Promise<U>;
    delete(id: U['id']): Promise<void>;
  }
  