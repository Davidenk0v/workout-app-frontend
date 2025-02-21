import { withForm } from "../hoc/with.form";
import { Login } from "../types/user";
import { LOGIN_INPUTS } from "../utils/consts";
import AlertMessage from "./AlertMessage";
import Button from "./Button";

interface FormProps {
  formValues: Login;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  errorMessageEmail: string;
  errorMessage: string;
}

export const Form = ({
  formValues,
  handleChange,
  errorMessageEmail,
  errorMessage,
  handleSubmit,
}: FormProps) => {
  return (
    <div className="max-w-sm mx-auto text-center">
      {errorMessage && <AlertMessage text={errorMessage} type="error" />}
      {LOGIN_INPUTS.map(({ id, label, placeholder, type }) => (
        <>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-black"
            >
              {label}
            </label>
            <input
              data-test={id}
              onChange={handleChange}
              type={type}
              id={id}
              value={formValues[id as keyof typeof formValues]}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                label == "Correo electrónico" && errorMessageEmail
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder={placeholder}
              required
            />
            {label == "Correo electrónico" && errorMessageEmail && (
              <span
                data-test="bad-email"
                className="text-red-500 text-xs font-medium"
              >
                {errorMessageEmail}
              </span>
            )}
          </div>
        </>
      ))}
      <Button
        data-test="login-button-form"
        onClick={handleSubmit}
        type="submit"
        text="Login"
      />
    </div>
  );
};

export const LoginForm = withForm(
  Form,
  {
    email: "",
    password: "",
  },
  "login"
);
