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

  return (
    <Provider value={providerValues}>{children}</Provider>
  );
};

export const useTable = () => useContext(TableContext);
```
## 📌 HOC de Login y Register

```tsx
// Hoc para manejar la lógica de los formularios. Tanto la de register como la de logín, abstrayendo la lógica de los componentes en si.
// Recibe un componente, un estado inicial y el tipo de formulario que es.
// Devuelve un componente con la lógica de los formularios.
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
---

_Desarrollado con ❤️ por [David](https://github.com/davidenk0v)_

