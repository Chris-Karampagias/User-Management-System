import { Stack, Typography, Paper } from "@mui/material";
import { UserPreviewCard } from "./components";
import { useUsers } from "../../queries/useUsers";
import { PaginatedList } from "../../components";

const renderItem = (user) => {
  return (
    <UserPreviewCard
      key={user?.id}
      username={user?.username}
      userId={user?.id}
      role={user?.role}
    />
  );
};

export function AllUsers() {
  const { users, isLoadingUsers } = useUsers();
  return (
    <Paper elevation={2} sx={{ padding: "20px 10px" }}>
      <Stack direction="column" gap={3}>
        <Typography alignSelf="center" variant="h1" fontSize={30}>
          All Users
        </Typography>
        <PaginatedList items={users} renderItem={renderItem}/>
      </Stack>
    </Paper>
  );
}
