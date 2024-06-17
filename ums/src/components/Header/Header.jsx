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
  const isAuthentication =
    pathname === routesConfig.authentication.browserRouter.path;
  const pointerEvents = isChangePassword ? "none" : "auto";
  return (
    <Paper elevation={3} sx={{ padding: "15px", marginBottom: "20px" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack>
          <Link
            to={routesConfig.home.browserRouter.path}
            style={{ textDecoration: "none", color: "inherit", pointerEvents }}
          >
            <Typography component={"h1"} fontSize={24} color={"secondary"}>
              UMS
            </Typography>
            {isUserLoggedIn() && (
              <Typography>Welcome back, {user.username}</Typography>
            )}
          </Link>
        </Stack>

        {isUserLoggedIn() && (
          <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
            <Button
              disabled={isChangePassword}
              size="small"
              color={isHome ? "secondary" : "primary"}
            >
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to={routesConfig.home.browserRouter.path}
              >
                Home
              </Link>
            </Button>
            {isUserAdmin() && (
              <>
                <Button
                  disabled={isChangePassword}
                  size="small"
                  color={isAllUsers ? "secondary" : "primary"}
                >
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to={routesConfig.allUsers.browserRouter.path}
                  >
                    All Users
                  </Link>
                </Button>

                <Button
                  disabled={isChangePassword}
                  size="small"
                  color={isAuthentication ? "secondary" : "primary"}
                >
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to={routesConfig.authentication.browserRouter.path}
                  >
                    Authentication
                  </Link>
                </Button>
              </>
            )}
            <Button
              color="error"
              onClick={() => {
                removeUserAndPreference();
                if (!isAuthentication) {
                  return navigate(
                    routesConfig.authentication.browserRouter.path
                  );
                }

                window.location.reload();
              }}
            >
              Log Out
            </Button>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
