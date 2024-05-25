import { useUser } from "../../hooks/useUser/useUser";

export const withUser = () => (WrappedComponent) => {
  const ResultComponent = (props) => {
    const user = useUser(props.userId);
    return <WrappedComponent {...props} user={user}/>
  };

  return ResultComponent;
}