import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

const listStyled = {
  fontSize: "2rem",
};

const buttonStyled = {
  borderRadius: "1rem",
  cursor: "pointer",
};

// ErrorBoundary 只能用類別元件撰寫的原因是，React 的錯誤邊界必須透過類別元件中的 componentDidCatch 或 getDerivedStateFromError 來捕獲錯誤。
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleLoginAgain = () => {
    window.location.href = "/login";
  };

  handleReloadPage = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div style={{ width: "100%" }}>
            <h1 style={{ width: "95%", margin: "0 auto" }}>
              頁面發生錯誤，請嘗試 :
            </h1>
            <ul style={{ width: "90%", marginLeft: "2rem" }}>
              <li style={listStyled}>
                <button
                  style={{ ...buttonStyled, ...listStyled }}
                  onClick={this.handleReloadPage}
                >
                  重整頁面
                </button>
              </li>
              <li style={listStyled}>
                <button
                  style={{
                    ...buttonStyled,
                    ...listStyled,
                  }}
                  onClick={this.handleLoginAgain}
                >
                  重新登入
                </button>
              </li>
            </ul>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
