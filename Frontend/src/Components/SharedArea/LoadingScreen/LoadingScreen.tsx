import { useEffect } from "react";
import "./LoadingScreen.css";
import Loading from "../Loading/Loading";

interface LoadingScreenProps {
  backendReady: boolean;
}

export function LoadingScreen(props: LoadingScreenProps): JSX.Element {
  useEffect(() => {
    if (props.backendReady) return;}, [props.backendReady]);

  if (props.backendReady) {
    return null; // No need to show loading screen once backend is ready.
  }

  return (
    <div className="LoadingScreen">
      <div className="loading-overlay">
        <div className="loading-content">
          <Loading />
          <p>Loading... Please wait while the backend is starting.</p>
          <p>This can take about a minute.</p>
        </div>
      </div>
    </div>
  );
}
