import { RotiroError } from 'rotiro';
import { RotiroErrorCode } from 'rotiro/lib/errors/error-codes';
import { User } from '../index';

// This is a faked set of test services to manage users. It will behave differently depending on
// the environment it is running in. If loaded from an express app then the data will
// persist until the application is restarted, however if running from a lambda the
// state empty on each request so the resetUsers function will populate the data to allow each
// command to work regardless

let users: Record<string, User>;
let nextId = 0;
resetUsers();

export async function addUser(name: string, age: number): Promise<User> {
  resetUsers();
  if (!name || age < 1) {
    throw new RotiroError(
      'Invalid user data',
      undefined,
      RotiroErrorCode.OriginalRequestNotValid.toString()
    );
  }

  nextId++;
  const user: User = {
    id: nextId.toString(),
    name,
    age
  };
  users[user.id] = user;
  return user;
}

export async function getUser(userId: string): Promise<User> {
  resetUsers();
  const user = users[userId];
  if (user) {
    return user;
  }

  throw new RotiroError(
    'User not found',
    undefined,
    RotiroErrorCode.PathNotFound.toString()
  );
}

export async function getUsers(): Promise<User[]> {
  resetUsers();
  return Object.values(users);
}

export async function deleteUser(userId: string): Promise<string> {
  resetUsers();
  if (users[userId]) {
    delete users[userId];
    return userId;
  }

  throw new RotiroError(
    'User not found',
    undefined,
    RotiroErrorCode.PathNotFound.toString()
  );
}

export async function search(query: string): Promise<User[]> {
  resetUsers();
  const searchResults: User[] = [];
  const searchParam = (query || '').toLowerCase();
  if (searchParam.length === 0) {
    return searchResults;
  }

  for (const user of Object.values(users)) {
    const name = user.name.toLowerCase();
    if (name.indexOf(searchParam) > -1) {
      searchResults.push(user);
    }
  }

  return searchResults;
}

export async function updateUser(userId: string, payload: any): Promise<User> {
  const user: User = await getUser(userId);

  Object.keys(payload).forEach(key => {
    if (typeof (user as any)[key] !== 'undefined') {
      (user as any)[key] = payload[key];
    }
  });

  return user;
}

function resetUsers() {
  // if there are not users, repopulate the list
  if (!users || !Object.values(users)) {
    users = {
      '1': { id: '1', name: 'Bob', age: 19 },
      '2': { id: '2', name: 'James', age: 75 },
      '3': { id: '3', name: 'Georgina', age: 31 },
      '4': { id: '4', name: 'Margret', age: 55 },
      '5': { id: '5', name: 'Terry', age: 26 },
      '6': { id: '6', name: 'Frank', age: 46 },
      '7': { id: '7', name: 'Sarah', age: 25 },
      '8': { id: '8', name: 'Tom', age: 67 },
      '9': { id: '9', name: 'Charles', age: 34 },
      '10': { id: '10', name: 'Charlotte', age: 53 },
      '11': { id: '11', name: 'Emily', age: 18 },
      '12': { id: '12', name: 'Roger', age: 42 },
      '13': { id: '13', name: 'Jane', age: 21 }
    };
  }

  // set the next id for adding users
  nextId = Object.values(users).length + 1;
}
