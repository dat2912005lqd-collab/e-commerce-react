import {
  Component,
  type ErrorInfo,
  type ReactNode,
} from "react";
interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}
export default class ErrorBoundary
  extends Component<Props, State> {
  state: State = {
    hasError: false,
  };
  static getDerivedStateFromError(): State {
    return {
      hasError: true,
    };
  }
  componentDidCatch(
    _error: Error,
    _info: ErrorInfo
  ) {
  }
  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h2>
            Có lỗi xảy ra.
          </h2>
          <p>
            Vui lòng tải lại trang.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}