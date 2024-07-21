import { Stack, Typography, Paper } from "@mui/material";
import { useUsers } from "../../queries/useUsers";
import { Pagination } from "./components";

export function AllUsers() {
  const { users, isLoadingUsers } = useUsers();
  return (
    <Paper elevation={2} sx={{ padding: "20px 10px" }}>
      <Stack direction="column" gap={3}>
        <Typography alignSelf="center" variant="h1" fontSize={30}>
          All Users
        </Typography>
        <Pagination users={users} />
      </Stack>
    </Paper>
  );
}
