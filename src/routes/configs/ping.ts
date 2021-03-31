import {ApiRequest, RouteConfig} from 'rotiro';

export const pingConfig: RouteConfig = {
  methods: {
    GET: {
      controller: getController
    }
  }
};

async function getController(apiRequest: ApiRequest): Promise<void> {
  apiRequest.send(`Pong : ${Date.now()}`);
}
