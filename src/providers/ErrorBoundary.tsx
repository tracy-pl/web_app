import React, { ErrorInfo } from 'react';

import { SomethingWentWrongPage } from 'screens/SomethingWentWrongPage/Loadable';

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
  }
> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = {
      error: null,
      hasError: false,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <SomethingWentWrongPage />;
    }

    return this.props.children;
  }
}
