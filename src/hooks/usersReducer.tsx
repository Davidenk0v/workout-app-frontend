import { useEffect, useReducer } from "react";
import { idUser, User, UserList } from "../types/user";
import { ACTIONS_USER } from "../utils/consts";
import { deleteById, getUsers, updateUser } from "../services/userService";

interface state {
  sync: boolean;
  users: UserList;
}

const initialState: state = {
  sync: false,
  users: [],
};

type UserAction =
  | { type: "add"; payload: { user: User } }
  | { type: "remove"; payload: { id: idUser } }
  | { type: "update"; payload: { user: User; id: idUser } }
  | { type: "set"; payload: { users: UserList } };

export const usersReducer = (state: state, action: UserAction): state => {
  if (action.type === ACTIONS_USER.SET) {
    const { users } = action.payload;
    return { ...state, sync: false, users };
  }
  if (action.type === ACTIONS_USER.ADD) {
    const { user } = action.payload;
    return { ...state, sync: true, users: [...state.users, user] };
  }
  if (action.type === ACTIONS_USER.UPDATE) {
    const { user } = action.payload;
    return {
      ...state,
      sync: false,
      users: state.users.map((u) => (u.idUser === user.idUser ? user : u)),
    };
  }
  if (action.type === ACTIONS_USER.REMOVE) {
    const { id } = action.payload;
    return {
      ...state,
      sync: false,
      users: state.users.filter((u) => {
        return u.idUser !== id.idUser;
      }),
    };
  }
  return state;
};

export const useUsers = () => {
  const [{ sync, users }, dispatch] = useReducer(usersReducer, initialState);

  const handleUpdateUser = (user: User, id: idUser) => {
    updateUser(id, user).then(() => {
      dispatch({ type: "update", payload: { user, id } });
    });
  };

  const handleRemoveUser = (id: idUser) => {
    deleteById(id).then(() => {
      dispatch({ type: "remove", payload: { id } });
    });
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token") || "{}").token;
    getUsers(token)
      .then((response) => response.json())
      .then((users) => {
        dispatch({ type: "set", payload: { users } });
      });
  }, []);

  useEffect(() => {
    if (sync) {
      const token = JSON.parse(localStorage.getItem("token") || "{}").token;
      getUsers(token)
        .then((response) => response.json())
        .then((users) => {
          dispatch({ type: "set", payload: { users } });
        });
    }
  }, [users, sync]);

  return { handleRemoveUser, handleUpdateUser, users };
};
