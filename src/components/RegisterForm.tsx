import { withForm } from "../hoc/with.form";
import { REGISTER_INPUTS } from "../utils/consts";
import { Register } from "../types/user";
import AlertMessage from "./AlertMessage";
import Button from "./Button";

interface FormProps {
  formValues: Register;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  errorMessage?: string;
}

const RegForm: React.FC<FormProps> = ({
  formValues,
  handleChange,
  handleSubmit,
  errorMessage,
}) => {
  return (
    <form className="max-w-sm mx-auto text-center">
      {errorMessage && <AlertMessage text={errorMessage} type="warning" />}
      {REGISTER_INPUTS.map(({ id, label, placeholder, type }) => (
        <div className="mb-5" key={id}>
          <label
            htmlFor={id}
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
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
              errorMessage && id === "email"
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300"
            }`}
            placeholder={placeholder}
            required
          />
          {errorMessage && id === "email" && (
            <span
              data-test="bad-email-message"
              className="text-red-500 text-xs font-medium"
            >
              {errorMessage}
            </span>
          )}
        </div>
      ))}
      <Button
        data-test="login-button-form"
        onClick={handleSubmit}
        type="submit"
        text="Login"
      />
    </form>
  );
};

export const RegisterForm = withForm(
  RegForm,
  {
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
  },
  "register"
);
