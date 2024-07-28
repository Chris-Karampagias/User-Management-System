import { Stack, Typography, Paper, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { UserPreviewCard } from "./components";
import { userIdSelector } from "../../models/user/selectors";
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
  const { users, isLoadingUsers, loadingUsersFailed } = useUsers();
  const userId = useSelector(userIdSelector);

  const usersWithoutCurrentAdmin = users.filter((user) => userId !== user.id);
  return (
    <Paper elevation={2} sx={{ padding: "20px 10px" }}>
      <Stack direction="column" gap={3}>
        <Typography alignSelf="center" variant="h1" fontSize={30}>
          All Users
        </Typography>
        {isLoadingUsers ? (
          <CircularProgress sx={{ alignSelf: "center" }} size={60} />
        ) : (
          <>
            {loadingUsersFailed ? (
              <Typography textAlign="center" fontSize={20} color="error">
                Unable to retrieve users data. Please try again later.
              </Typography>
            ) : (
              <PaginatedList
                items={usersWithoutCurrentAdmin}
                renderItem={renderItem}
              />
            )}
          </>
        )}
      </Stack>
    </Paper>
  );
}
