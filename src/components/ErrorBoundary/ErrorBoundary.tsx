import React from "react";
import "./ErrorBoundary.scss";
import animationData from "../../assets/lotties/went-wrong.json";

const RootHeader = React.lazy(() => import("../SharedComponents/RootHeader"));
const Lottie = React.lazy(() => import("react-lottie"));

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid",
  },
};

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="NotFound">
          <RootHeader parent={"Login"} />
          <div className="not-found-container">
            <Lottie options={defaultOptions} height={380} />
            <h1>Ooops!</h1>
            <p>Something went wrong.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
