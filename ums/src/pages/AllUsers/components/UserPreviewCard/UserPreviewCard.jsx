/* eslint-disable react/prop-types */
import { Paper, Stack, Typography, Button, Divider } from "@mui/material";

export function UserPreviewCard({ username, role }) {
  return (
    <Paper elevation={2} sx={{ padding: "30px" }}>
      <Stack justifyContent="space-between" direction="row">
        <Stack sx={{ width: "80%" }} direction="column" gap={1}>
          <Typography variant="p" fontSize={25} fontWeight={600}>
            {username}
          </Typography>
          <Divider flexItem />
          <Typography>{role}</Typography>
        </Stack>
        <Button variant="contained" size="small">
          Edit Info
        </Button>
      </Stack>
    </Paper>
  );
}
