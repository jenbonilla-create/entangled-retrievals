import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary] Caught error:", error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-navy-deep px-4">
            <div className="glass-card-premium p-8 rounded-2xl max-w-md text-center">
              <h1 className="font-hero text-2xl font-bold text-cream mb-4">
                Something went wrong
              </h1>
              <p className="text-silver mb-6">
                We encountered an unexpected error. Please refresh the page or
                try again later.
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="bg-coral text-navy font-bold px-6 py-3 rounded-xl hover:bg-orange-coral transition-smooth"
                data-ocid="error.reload_button"
              >
                Reload Page
              </button>
              {this.state.error && (
                <pre className="mt-4 text-xs text-cream/40 bg-navy/50 p-3 rounded-lg overflow-auto text-left">
                  {this.state.error.message}
                </pre>
              )}
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
