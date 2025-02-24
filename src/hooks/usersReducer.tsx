import { idUser, User } from "../types/user";

type initialState = User[];
type UserAction =
  | { type: "ADD"; payload: User }
  | { type: "REMOVE"; payload: idUser }
  | { type: "UPDATE"; payload: User; id: idUser }
  | { type: "SET"; payload: User[] };

export const usersReducer = (
  state: initialState,
  action: UserAction
): initialState => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((user) => user.idUser !== action.payload.idUser);
    case "UPDATE":
      return state.map((user) =>
        user.idUser === action.id.idUser ? action.payload : user
      );
    case "SET":
      return action.payload;
    default:
      return state;
  }
};
