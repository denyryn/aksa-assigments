import { RouterProvider } from "react-router";
import { routes } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { DivisionProvider } from "./contexts/DivisionContext";
import { EmployeeProvider } from "./contexts/EmployeeContext";

function App() {
  return (
    <>
      <SettingsProvider>
        <AuthProvider>
          <UserProvider>
            <DivisionProvider>
              <EmployeeProvider>
                <RouterProvider router={routes} />
              </EmployeeProvider>
            </DivisionProvider>
          </UserProvider>
        </AuthProvider>
      </SettingsProvider>
    </>
  );
}

export default App;
