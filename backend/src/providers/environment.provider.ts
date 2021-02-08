import { Provider } from '@nestjs/common';

export const EnvironmentToken = Symbol('EnvironmentToken');

export const EnvironmentProvider: Provider<NodeJS.ProcessEnv> = {
  provide: EnvironmentToken,
  useFactory: () => process.env,
};
