import { useSelector } from "react-redux";
import { Paper, Stack, Typography, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userSelector } from "../../models/user/selectors";
import { useUserTools } from "../../hooks/useUserTools";
import { routesConfig } from "../../app";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isUserAdmin, isUserLoggedIn, removeUserAndPreference } =
    useUserTools();
  const user = useSelector(userSelector);
  const pathname = location.pathname;
  const isHome = pathname === routesConfig.home.browserRouter.path;
  const isAllUsers = pathname === routesConfig.allUsers.browserRouter.path;
  const isChangePassword =
    pathname === routesConfig.changePassword.browserRouter.path;
  const pointerEvents = isChangePassword ? "none" : "auto";
  return (
    <Paper elevation={3} sx={{ padding: "15px", marginBottom: "20px" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Link
          to={routesConfig.home.browserRouter.path}
          style={{ textDecoration: "none", color: "inherit", pointerEvents }}
        >
          <Typography component={"h1"}>UMS</Typography>
        </Link>
        {isUserLoggedIn() && (
          <>
            <Typography>Welcome back, {user.username}</Typography>
            <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
              <Link
                to={routesConfig.home.browserRouter.path}
                style={{
                  textDecoration: isHome ? "underline black" : "none",
                  color: "inherit",
                  pointerEvents,
                }}
              >
                <Typography>Home</Typography>
              </Link>
              {isUserAdmin() && (
                <Link
                  to={routesConfig.allUsers.browserRouter.path}
                  style={{
                    textDecoration: isAllUsers ? "underline black" : "none",
                    color: "inherit",
                    pointerEvents,
                  }}
                >
                  <Typography>All Users</Typography>
                </Link>
              )}
              <Button
                color="error"
                onClick={() => {
                  removeUserAndPreference();
                  navigate(routesConfig.authentication.browserRouter.path);
                }}
              >
                Log Out
              </Button>
            </Stack>
          </>
        )}
      </Stack>
    </Paper>
  );
}
