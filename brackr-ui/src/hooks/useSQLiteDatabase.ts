import {
  CapacitorSQLite,
  SQLiteConnection,
  type SQLiteDBConnection
} from 'app/src-capacitor/node_modules/@capacitor-community/sqlite';
import { Capacitor } from 'app/src-capacitor/node_modules/@capacitor/core';
import { Dialog } from 'quasar';

class DatabaseService {
  private sqlite: SQLiteConnection | null = null;
  private db: SQLiteDBConnection | null = null;
  private initialized = false;

  async initialize() {
    if (this.initialized) return;

    if (!Capacitor.isNativePlatform()) {
      console.warn('SQLite is only available on native platforms');
      return;
    }

    try {
      this.sqlite = new SQLiteConnection(CapacitorSQLite);
      const ret = await this.sqlite.checkConnectionsConsistency();
      const isConn = (await this.sqlite.isConnection('brackr', false)).result;

      if (ret.result && isConn) {
        this.db = await this.sqlite.retrieveConnection('brackr', false);
      } else {
        this.db = await this.sqlite.createConnection(
          'brackr',
          false,
          'no-encryption',
          1,
          false
        );
      }

      await this.db.open();

      // Create tables
    //   await this.db.execute(`
    //     CREATE TABLE IF NOT EXISTS scans (
    //       id INTEGER PRIMARY KEY AUTOINCREMENT,
    //       code TEXT NOT NULL UNIQUE,
    //       weight REAL,
    //       reason TEXT,
    //       status TEXT NOT NULL,
    //       route TEXT NOT NULL,
    //       depot TEXT NOT NULL,
    //       timestamp TEXT NOT NULL,
    //       manager TEXT NOT NULL,
    //       scan_type TEXT NOT NULL,
    //       staff TEXT NOT NULL
    //     )
    //   `);

    }
    catch (error) {
        console.error('Error initializing SQLite database:', error);
        Dialog.create({
            title: 'Database Error',
            message: 'Failed to initialize the database. Please try again later.',
            ok: {
            label: 'OK',
            color: 'negative'
            }
        });
        }
    }
}


export const useDatabase = new DatabaseService()