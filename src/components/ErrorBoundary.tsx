import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Terminal } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In production, suppress verbose telemetry to avoid leaking internals
    if (process.env.NODE_ENV !== 'production') {
      console.error('ErrorBoundary caught error:', error, errorInfo);
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#030303] text-[#f1eee8] flex items-center justify-center p-6 selection:bg-[#ff8c59] selection:text-[#030303]">
          <div className="w-full max-w-xl p-8 rounded-3xl bg-[#08080a] border border-[rgba(241,238,232,0.14)] shadow-[0_0_80px_rgba(0,0,0,0.9)] text-center space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-[#ff8c59]/10 border border-[#ff8c59]/30 text-[#ff8c59] mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(255,140,89,0.2)]">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <div className="eyebrow mx-auto justify-center">
                // EXCEPTION CAUGHT & ISOLATED
              </div>
              <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#f1eee8]">
                Pipeline Interruption Handled
              </h1>
              <p className="text-[#aaa9a4] text-xs sm:text-sm font-sans max-w-md mx-auto leading-relaxed">
                The application encountered an unexpected state. The visual boundary caught the issue to prevent cascading failure.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#030303] border border-[rgba(241,238,232,0.08)] font-mono text-[11px] text-[#aaa9a4] flex items-center justify-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#ff8c59]" />
              <span>Status: Safe Fallback Rendered · All Services Protected</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-xs">
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-full bg-[rgba(241,238,232,0.06)] hover:bg-[rgba(241,238,232,0.12)] border border-[rgba(241,238,232,0.12)] text-[#f1eee8] transition-all cursor-pointer"
              >
                Reset State
              </button>
              <button
                onClick={this.handleReload}
                className="px-6 py-2.5 rounded-full bg-[#f1eee8] text-[#030303] hover:bg-[#ff8c59] font-medium flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
