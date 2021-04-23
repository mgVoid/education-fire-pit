import { cleanEnv, port } from 'envalid';

export default () =>
  cleanEnv(process.env, {
    API_PORT: port(),
  });
