import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In production, send this to Sentry or a logging service
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    // Hard reload the window to clear corrupted state
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-screen bg-[#050507] flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full glass-strong rounded-3xl p-8 border border-red-500/20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-red-500/5 blur-3xl" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              
              <h2 className="text-xl font-bold text-white mb-3">System Anomaly Detected</h2>
              
              <p className="text-sm text-white/60 mb-6 leading-relaxed">
                We encountered an unexpected error while rendering the scheme database. 
                Our architectural fail-safe has caught this to prevent data corruption.
              </p>
              
              {this.state.error && (
                <div className="bg-black/50 border border-white/5 rounded-xl p-3 mb-6 text-left overflow-x-auto">
                  <code className="text-[10px] text-red-300 font-mono">
                    {this.state.error.message}
                  </code>
                </div>
              )}
              
              <Button 
                onClick={this.handleReset}
                className="w-full bg-white/10 hover:bg-white/20 text-white rounded-xl h-12 border border-white/10"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Reboot Subsystem
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
