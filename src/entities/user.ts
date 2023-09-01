import { WithqdwicdfId } from '../entities/id'

export type LoginData = {
  userName: string;
  passwd: string;
  email: string;
};

export type UserNoId = LoginData & {
  firstName: string;
  nick: string;
  team: string;
    
};

export type User = WithId & UserNoId;