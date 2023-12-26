export const MIGRATE_KEY = 'migrated';
export enum UpgradeStatus {
  START,
  UPGRADING,
  UPGRADED,
  UPGRADE_FAILED,
}

export const V1DB_NAME = '微帝国AI';
export const V1DB_TABLE_NAME = 'LOBE_CHAT';

export interface MigrationError {
  message: string;
  stack: string;
}
