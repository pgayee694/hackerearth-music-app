import { Provider } from '@nestjs/common';
import { Config } from '../models/config';
import * as config from '../config.json';

export const ConfigToken = Symbol('ConfigToken');

export const ConfigProvider: Provider<Config> = {
  provide: ConfigToken,
  useFactory: () => config as any,
};
