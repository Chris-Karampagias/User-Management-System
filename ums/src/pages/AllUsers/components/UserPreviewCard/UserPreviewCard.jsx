/* eslint-disable react/prop-types */
import { Paper, Stack, Typography, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routesConfig } from "../../../../app";

export function UserPreviewCard({ username, userId, role }) {
  const navigate = useNavigate();
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
        <Button
          variant="contained"
          size="small"
          onClick={() =>
            navigate(routesConfig.userDetails.extraProps.dynamicPath(userId))
          }
        >
          Edit Info
        </Button>
      </Stack>
    </Paper>
  );
}
