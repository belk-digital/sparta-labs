import * as migration_20260617_002016 from './20260617_002016';
import * as migration_20260617_192338 from './20260617_192338';
import * as migration_20260622_003309_add_google_auth_fields from './20260622_003309_add_google_auth_fields';

export const migrations = [
  {
    up: migration_20260617_002016.up,
    down: migration_20260617_002016.down,
    name: '20260617_002016',
  },
  {
    up: migration_20260617_192338.up,
    down: migration_20260617_192338.down,
    name: '20260617_192338',
  },
  {
    up: migration_20260622_003309_add_google_auth_fields.up,
    down: migration_20260622_003309_add_google_auth_fields.down,
    name: '20260622_003309_add_google_auth_fields'
  },
];
