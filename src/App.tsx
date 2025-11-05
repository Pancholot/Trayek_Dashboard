import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useSelector } from "react-redux";
import SignIn from "./pages/AuthPages/SignIn";
//import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import ConductoresPage from "./pages/Dashboard/Elements/Conductores";
import PasajerosPage from "./pages/Dashboard/Elements/Pasajeros";
import VehiculosPage from "./pages/Dashboard/Elements/Vehiculos";
import ViajesPage from "./pages/Dashboard/Elements/Viajes";
import SoportePage from "./pages/Dashboard/Elements/Soporte";
import { Navigate } from "react-router-dom";
import PromocionPage from "./pages/Dashboard/Elements/Promociones";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route
              index
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/conductores"
              element={
                <ProtectedRoute>
                  <ConductoresPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pasajeros"
              element={
                <ProtectedRoute>
                  <PasajerosPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vehiculos"
              element={
                <ProtectedRoute>
                  <VehiculosPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/viajes"
              element={
                <ProtectedRoute>
                  <ViajesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/soporte"
              element={
                <ProtectedRoute>
                  <SoportePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfiles />
                </ProtectedRoute>
              }
            />

            <Route
              path="/promociones"
              element={
                <ProtectedRoute>
                  <PromocionPage />
                </ProtectedRoute>
              }
            />
            {/* Others Page */}
            <Route path="/blank" element={<Blank />} />
            <Route path="/calendar" element={<Calendar />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          {/*<Route path="/signup" element={<SignUp />} />*/}

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLoggedOut = useSelector(
    (state: { auth: { isLoggedOut: boolean } }) => state.auth.isLoggedOut
  );

  console.log("isLoggedOut:", isLoggedOut);
  if (isLoggedOut) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}
