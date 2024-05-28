import { Login, SignUp } from "../../components";
import getUsers from "../../api/getUsers";
import { useQuery } from "@tanstack/react-query";

export default function Authentication() {
  const users = useQuery({ queryKey: ["users"], queryFn: getUsers });

  return <Login users={users.data} />;
}
