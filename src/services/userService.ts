import { db } from '../db';
import type { User } from '../types/database';

export const userService = {
  async validateCredentials(username: string, password: string): Promise<User | null> {
    const user = await db.users.where('username').equals(username).first();
    if (user && user.password === password) {
      return user;
    }
    return null;
  },

  async getAll(): Promise<User[]> {
    return db.users.toArray();
  },

  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const id = await db.users.add({
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    const user = await db.users.get(id);
    if (!user) throw new Error('Failed to create user');
    return user;
  },

  async update(id: number, userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User> {
    await db.users.update(id, {
      ...userData,
      updatedAt: new Date().toISOString()
    });
    const user = await db.users.get(id);
    if (!user) throw new Error('User not found');
    return user;
  },

  async delete(id: number): Promise<void> {
    await db.users.delete(id);
  }
};