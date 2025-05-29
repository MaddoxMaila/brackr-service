import { boot } from 'quasar/wrappers';
import { useDatabase } from 'src/hooks/useSQLiteDatabase';
import { Notify } from 'quasar';

export default boot(async () => {
  if (process.env.MODE === 'capacitor') {
    try {
      await useDatabase.initialize();
      console.log('SQLite database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize SQLite database:', error);
      Notify.create({
        type: 'negative',
        message: 'Failed to initialize database. Some features may not work.',
        position: 'top',
        timeout: 5000,
      });
    }
  }
});