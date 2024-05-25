import { useTimer } from "../../hooks";

export const withTimer = (initialSeconds) => (WrappedComponent) => {
  const ResultComponent = (props) => {
    const { seconds, resetTimer } = useTimer(initialSeconds);
    return <WrappedComponent {...props} seconds={seconds} resetTimer={resetTimer} />
  };

  return ResultComponent;
}