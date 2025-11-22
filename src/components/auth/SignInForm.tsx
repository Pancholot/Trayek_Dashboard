import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { apiService } from "../../api/apiService";
import { useNavigate } from "react-router-dom";
import Alert from "../ui/alert/Alert";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../store/authSlice";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const response = await apiService.logIn(email, password);
    if (response) {
      console.log("Login successful");
      dispatch(setIsLoggedIn());
      navigate("/");
    } else {
      setErrorMessage("Correo electrónico o contraseña incorrectos.");
    }
  };
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-4">
            {errorMessage && (
              <Alert title="ERROR" variant="error" message={errorMessage} />
            )}
          </div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Inicio de Sesión
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Ingrese tu correo electrónico y contraseña para acceder a tu
              cuenta.
            </p>
          </div>
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <Label>
                Correo Electrónico <span className="text-error-500">*</span>{" "}
              </Label>
              <Input
                placeholder="ejemplo@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setErrorMessage("")}
              />
            </div>
            <div className="mb-10">
              <Label>
                Contraseña <span className="text-error-500">*</span>{" "}
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setErrorMessage("")}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  )}
                </span>
              </div>
            </div>
            <Button type="submit" className="w-full" size="sm">
              Inicio de Sesión
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
