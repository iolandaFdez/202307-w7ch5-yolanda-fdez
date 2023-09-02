type Id =  {
  id: string;
 }

export type LoginData = {
  userName: string;
  passwd: string;
  email: string;
};

export type UserNoId = LoginData & {
  firstName: string;
  nick: string;
  allies: User;
  enemies: User;
  isAlive: Boolean

    
};



export type User = Id & UserNoId;