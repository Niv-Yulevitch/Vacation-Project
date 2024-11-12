import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";
import appConfig from "../../../Utils/Config";
import { LoadingScreen } from "../../SharedArea/LoadingScreen/LoadingScreen";

function Layout(): JSX.Element {
  const [backendReady, setBackendReady] = useState<boolean>(false);

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch(
          `${appConfig.vacationsUrl}images/not-found.jpg`
        ); // Replace with your backend health endpoint
        if (response.ok) {
          setBackendReady(true);
        }
      } catch (error) {
        console.error("Error checking backend status:", error);
      }
    };

    // Poll every 3 seconds
    const intervalId = setInterval(checkBackendStatus, 3000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="Layout">
      {backendReady ? (
        <>
          <header>
            <Header />
          </header>

          <main>
            <Routing />
          </main>

          <footer>
            <Footer />
          </footer>
        </>
      ) : (
        <LoadingScreen backendReady={backendReady} />
      )}
    </div>
  );
}

export default Layout;
