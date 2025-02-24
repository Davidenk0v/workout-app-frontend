export interface User {
  idUser: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export type Register = User<Exclude, "idUser">;

export interface Login {
  email: string;
  password: string;
}

export type idUser = Pick<User, "idUser">;
export type emailUser = Pick<User, "email">;

export type UserList = User[];
