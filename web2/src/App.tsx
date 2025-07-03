import "./App.css";
import Auth from "./auth";
import { AuthContext } from "./auth/authProvider";
import { useContext } from "react";
import Dashboard from "./dashboard/dashboard";
import { ChatProvider } from "./chat/chatProvider";
import { DashboardProvider } from "./dashboard/dashboardContext";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="h-[100dvh] w-[100vw] bg-gray-900 overflow-hidden">
      <ChatProvider>
        <DashboardProvider>
          <Dashboard />
        </DashboardProvider>
      </ChatProvider>
    </div>
  );
}

export default App;
