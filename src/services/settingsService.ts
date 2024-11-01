import { db } from '../db';
import type { Setting } from '../types/database';

export const settingsService = {
  async getSetting(key: string): Promise<string | null> {
    const setting = await db.settings.get(key);
    return setting?.value ?? null;
  },

  async setSetting(key: string, value: string): Promise<void> {
    await db.settings.put({
      key,
      value,
      updatedAt: new Date().toISOString()
    });
  },

  async getAllSettings(): Promise<Setting[]> {
    return db.settings.toArray();
  }
};