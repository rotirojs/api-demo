import {ApiRequest, RouteConfig} from 'rotiro';
import { deleteUser, getUser, updateUser } from '../../services/users';

export const userConfig: RouteConfig = {
  path: { userId: { type: 'string' } },
  methods: {
    GET: {
      controller: getController
    },
    DELETE: {
      controller: deleteController
    },
    PATCH: {
      body: {
        name: { type: 'string', optional: true },
        age: { type: 'number', optional: true }
      },
      controller: patchController
    }
  }
};

async function getController(apiRequest: ApiRequest): Promise<void> {
  if (apiRequest.valid) {
    const userId = apiRequest.path.userId.value;
    const user = await getUser(userId);
    apiRequest.send(user);
  }
}

async function deleteController(apiRequest: ApiRequest): Promise<void> {
  if (apiRequest.valid) {
    const userId = apiRequest.path.userId.value;
    const deletedUserId = await deleteUser(userId);
    apiRequest.send(deletedUserId);
  }
}

async function patchController(apiRequest: ApiRequest): Promise<void> {
  if (apiRequest.valid) {
    const userId = apiRequest.path.userId.value;
    const name = apiRequest.body.name.value;
    const age = apiRequest.body.age.value;
    const updatedUser = await updateUser(userId, { name, age });
    apiRequest.send(updatedUser);
  }
}
