import Dexie from 'dexie';
import type { User, Setting } from '../types/database';

class AppDatabase extends Dexie {
  users!: Dexie.Table<User, number>;
  settings!: Dexie.Table<Setting, string>;

  constructor() {
    super('PadelWeatherDB');
    
    this.version(1).stores({
      users: '++id, username',
      settings: 'key'
    });

    // Add default admin user if not exists
    this.on('ready', async () => {
      const adminUser = await this.users.where('username').equals('admin').first();
      if (!adminUser) {
        await this.users.add({
          username: 'admin',
          password: 'padel123',
          isAdmin: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    });
  }
}

export const db = new AppDatabase();