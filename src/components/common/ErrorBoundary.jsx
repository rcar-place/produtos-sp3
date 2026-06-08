// ============================================
// SP3 CONECTORES — Error Boundary
// ============================================

import { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__content">
            <div className="error-boundary__icon">
              <AlertTriangle size={48} />
            </div>
            <h2 className="error-boundary__title">Ops! Algo deu errado</h2>
            <p className="error-boundary__message">
              Ocorreu um erro inesperado. Por favor, tente novamente.
            </p>
            <button className="error-boundary__button" onClick={this.handleReset}>
              <RefreshCw size={18} />
              Tentar novamente
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
