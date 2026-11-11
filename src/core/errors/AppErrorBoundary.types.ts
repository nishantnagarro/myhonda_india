import { ReactNode, ErrorInfo } from "react";

export interface AppErrorBoundaryProps {
  children: ReactNode;
  fallback?:
    | ReactNode
    | ((props: { error: Error; resetError: () => void }) => ReactNode);
  onCatch?: (error: Error, errorInfo: ErrorInfo) => void;
}

export interface AppErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
