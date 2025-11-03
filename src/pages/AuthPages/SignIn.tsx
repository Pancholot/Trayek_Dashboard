import React from "react";
import PageMeta from "../../components/common/PageMeta";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Inicio de Sesión"
        description="Inicia tu sesión para acceder al panel de administración de Trayek."
      />

      {/* === Page Container === */}
      <div className="relative flex flex-col justify-center w-full h-screen bg-white dark:bg-gray-900 p-6 sm:p-0 lg:flex-row">
        {/* === Left: Form Section === */}
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <SignInForm />
        </div>

        {/* === Right: Promo / Illustration Section === */}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-blue-light-Trayek dark:bg-blue-dark-Trayek lg:grid">
          <div className="relative flex items-center justify-center z-1">
            <div className="flex flex-col items-center max-w-xs">
              <img
                width={231}
                height={48}
                src="/images/logo/trayek-dark.png"
                alt="Trayek Logo"
                className="mb-4 dark:hidden"
              />
              <img
                width={231}
                height={48}
                src="/images/logo/trayek-dark.png"
                alt="Trayek Logo Dark"
                className="hidden mb-4 dark:block"
              />
              <p className="text-center text-white dark:text-white/60">
                Bienvenido al panel de administración de Trayek.
              </p>
            </div>
          </div>
        </div>

        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </>
  );
}
