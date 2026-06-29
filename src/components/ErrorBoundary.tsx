import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0E0A1C] text-[#FFE6F2] p-4">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">出错了</p>
            <p className="text-sm text-[rgba(252,220,236,0.5)]">请刷新页面重试</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 rounded-lg bg-[rgba(255,143,187,0.15)] border border-[rgba(255,143,187,0.3)] text-[#FFB3D1] text-sm hover:bg-[rgba(255,143,187,0.25)] transition-colors"
            >
              刷新
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
