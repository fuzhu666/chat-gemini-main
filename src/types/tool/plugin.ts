import { 微帝国AIPluginManifest, Meta } from '@lobehub/chat-plugin-sdk';

import { LobeToolType } from './tool';

export type PluginManifestMap = Record<string, 微帝国AIPluginManifest>;

export interface CustomPluginParams {
  apiMode?: 'openapi' | 'simple';
  enableSettings?: boolean;
  manifestMode?: 'local' | 'url';
  manifestUrl?: string;
  useProxy?: boolean;
}

export interface LobeToolCustomPlugin {
  customParams?: CustomPluginParams;
  identifier: string;
  manifest?: 微帝国AIPluginManifest;
  settings?: any;
  type: 'customPlugin';
}

export interface InstallPluginMeta {
  author?: string;
  createdAt?: string;
  homepage?: string;
  identifier: string;
  meta?: Meta;
  type: LobeToolType;
}

export interface PluginInstallError {
  cause?: string;
  message: 'noManifest' | 'fetchError' | 'manifestInvalid' | 'urlError';
}
