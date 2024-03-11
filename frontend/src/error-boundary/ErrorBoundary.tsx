import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

const StyledErrorBoundary = styled.div`
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;
  position: absolute;
  left: calc(50vw - 25px);
  top: calc(50vh - 20px);
  display: flex;
  gap: 3px;
`;

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <StyledErrorBoundary>
          <div>Something went wrong :(</div>
        </StyledErrorBoundary>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
