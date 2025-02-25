# 🏋️‍♂️ Workout App (Práctica)

Training Tracker es una aplicación web desarrollada con **React**, **Vite**, **TailwindCSS** y **TypeScript**. Permite a los usuarios registrarse y añadir sus entrenamientos. Esta aplicación sirve como práctica para la implementación de patrones de diseño en React.

## 🚀 Tecnologías

- ⚛️ **React** + **Vite** - Para un desarrollo rápido y eficiente.
- 🎨 **TailwindCSS** - Para un estilizado moderno y responsive.
- 📝 **TypeScript** - Para un código más seguro y escalable.
- ✅ **Cypress** - Para pruebas end-to-end automatizadas.
- 🏗️ **Patrones de diseño**:
  - **HOC (Higher-Order Components)**
  - **Factory Pattern**
  - **Compound Components**

## 📦 Instalación

Clona el repositorio y ejecuta los siguientes comandos:

```bash
# Clonar el repositorio
git clone https://github.com/davidenk0v/workout-app-frontend

# Navegar al directorio
cd workout-app-frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

## 🎯 Funcionalidades

- Registro e inicio de sesión.
- Añadir y eliminar entrenos.
- Gestionar usuarios (Solo admin)
- Diseño modular y reutilizable basado en patrones de diseño.
- UI responsiva y moderna con TailwindCSS.
- Pruebas automatizadas con Cypress.

## 🏗️ Patrones de Diseño Implementados

### 🔹 Higher-Order Components (HOC)

Utilizado para manejar la autenticación de los usuarios y mejorar la reutilización del código.

### 🔹 Factory Pattern

Se aplica para la creación dinámica de componentes reutilizables, como formularios o tarjetas de entrenamientos.

### 🔹 Compound Components

Usado para mejorar la flexibilidad de los componentes, permitiendo una mejor composición en la UI.

## 🛠️ Scripts Disponibles

```bash
npm run dev        # Ejecuta la aplicación en modo desarrollo
npm run build      # Construye la aplicación para producción
npm run lint       # Analiza el código en busca de errores
npx cypress open   # Ejecuta pruebas unitarias en cypress
```

## 📌 Ejemplo de Código:

## Contexto de la Tabla

```tsx
interface TableContextType {
  users: UserList;
  alertDelete: (id: idUser) => void;
}

const TableContext = createContext<TableContextType | null>(null);
const { Provider } = TableContext;

interface Props {
  children: React.ReactNode;
}

export const TableProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<UserList>([]);

  const deleteUser = async (id: idUser) => {
    try {
      const response = await deleteById(id);
      if (response.ok) {
        await response.json();
        getUserList();
      }
    } catch (e) {
      console.error("Error al eliminar el usuario", e);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al eliminar el usuario. Intenta nuevamente.",
      });
    }
  };

  const getUserList = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token") || "{}");
      const response = await getUsers(token.token);
      if (response.ok) {
        const userList = await response.json();
        setUsers(userList);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar la lista de usuarios. Intenta nuevamente.",
        });
      }
    } catch (e) {
      console.error("Error al cargar los usuarios", e);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al cargar los usuarios. Intenta nuevamente.",
      });
    }
  };

  const alertDelete = (id: idUser) => {
    deleteUserSwal(id, deleteUser);
  };

  useEffect(() => {
    getUserList();
  }, []);

  const providerValues = { users, alertDelete };

  return <Provider value={providerValues}>{children}</Provider>;
};

export const useTable = () => useContext(TableContext);
```

## 📌 HOC de Login y Register
>[!TIP]
>Hoc para manejar la lógica de los formularios. Tanto la de register como la de logín, abstrayendo la lógica de los componentes en si.
>Recibe un componente, un estado inicial y el tipo de formulario que es.
>Devuelve un componente con la lógica de los formularios.
```tsx
export const withForm = (
  Component: React.ComponentType<Login | Register>,
  initialState: Login | Register,
  typeOfForm: "login" | "register"
) => {
  const FormLogicComponent = (props: Login | Register) => {
    const authContext = useAuth();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState(initialState);
    const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Función para validar el email con regex
    const validateEmail = (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    };

    // Manejamos los input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormValues({ ...formValues, [id]: value });

      if (id === "email") {
        if (!validateEmail(value)) {
          setErrorMessageEmail("Email inválido");
        } else {
          setErrorMessageEmail("");
        }
      }
    };

    // Aqui manejamos el envio del formulario comprobando si el email es válido o si ha puesto la password
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (formValues.username === "") {
        setErrorMessage("Introduzca un nombre de usuario");
        return;
      }
      if (!validateEmail(formValues.email)) {
        setErrorMessageEmail("Email inválido");
        return;
      } else if (formValues.password === "") {
        setErrorMessage("Introduzca una contraseña");
        return;
      }

      try {
        let response = null;
        if (typeOfForm === "login") {
          response = await login(formValues);
        } else if (typeOfForm === "register") {
          response = await register(formValues);
        }

        if (response && response.data) {
          localStorage.setItem("token", JSON.stringify(response.data));
          authContext?.setIsLoggedIn(true);
          setErrorMessage("");
          navigate("/profile");
        } else {
          setErrorMessage("Ocurrió un error. Por favor, inténtelo de nuevo.");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("Ocurrió un error. Por favor, inténtelo de nuevo.");
        }
      }
    };

    return (
      <Component
        {...props}
        formValues={formValues}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errorMessageEmail={errorMessageEmail}
        errorMessage={errorMessage}
      />
    );
  };

  return FormLogicComponent;
};
```

## 📌Modificar el title y el description de una aplicación en React para el SEO

```tsx
import { useEffect } from "react";

export const useSEO = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  useEffect(() => {
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
  }, [title, description]);
};
```

## 📌Usando un Hook para abstraer la lógica de los entrenamientos
>[!TIP]
>Hook para obtener los entrenamientos del usuario
>Abstraigo la lógica de los entrenamientos en este hook
>Devuelve los entrenamientos, la función para obtenerlos,
>la función para crear un nuevo entrenamiento y la función para borrar un entrenamiento

```tsx
export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const getWorkouts = useCallback(async () => {
    try {
      const idUser = getUserId();
      const response = await getUserWorkouts(idUser);
      if (response.ok) {
        const workoutsData = await response.json();
        setWorkouts(workoutsData);
      } else {
        console.error("Error fetching workouts: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching workouts: ", error);
    }
  }, []);

  const newWorkout = useCallback(
    async (workout: NewWorkout) => {
      try {
        const response = await createWorkout(workout);
        if (response.ok) {
          getWorkouts();
        } else {
          console.error("Error creating workout: ", response.statusText);
        }
      } catch (error) {
        console.error("Error creating workout: ", error);
      }
    },
    [getWorkouts]
  );

  const onDelete = useCallback(
    async (idWorkout: number) => {
      try {
        const response = await deleteWorkout(idWorkout);
        if (response.ok) {
          getWorkouts();
        } else {
          console.error("Error deleting workout: ", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting workout: ", error);
      }
    },
    [getWorkouts]
  );

  return { workouts, getWorkouts, newWorkout, onDelete };
};
```

## 📌Usando useReducer para la lógica de los usuarios

```tsx
type initialState = User[];
type UserAction =
  | { type: "ADD"; payload: User }
  | { type: "REMOVE"; payload: idUser }
  | { type: "UPDATE"; payload: User; id: idUser }
  | { type: "SET"; payload: User[] }; //Setea los usuarios

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
```

## 📌Y lo usamos así

```tsx
const [users, dispatch] = useReducer(usersReducer, []);

dispatch({ type: "REMOVE", payload: data });
```

## 📌El useReducer metido dentro de un custom hook para mejor abstracción

>[!TIP]
>Se unifica la llamada al disatch con la llamada a los servicios

```tsx

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

```

---

_Desarrollado con ❤️ por [David](https://github.com/davidenk0v)_
