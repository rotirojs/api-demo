import { Api } from 'rotiro';
import {
  homeConfig,
  pingConfig,
  searchConfig,
  userConfig,
  usersConfig
} from './configs';

export function createApi(): Api {
  const api = new Api();
  api.routes.add('home', '/', homeConfig);
  api.routes.add('ping', '/ping', pingConfig);
  api.routes.add('users', '/users', usersConfig);
  api.routes.add('user', '/users/:userId', userConfig);
  api.routes.add('search', '/search', searchConfig);

  api.build();
  return api;
}
