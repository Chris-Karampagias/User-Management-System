import { useDispatch, useSelector } from "react-redux";
import { Paper, Stack, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { userSelector, isUserAdminSelector } from "../../models/user/selectors";
import { routesConfig } from "../../app";
import { clearUser } from "../../models/user/actions";
import { useCurrentPath } from "../../hooks";

export function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isChangePasswordPath,
    isAuthenticationPath,
    isHomePath,
    isAllUsersPath,
    isNewUserPath,
  } = useCurrentPath();
  const isUserAdmin = useSelector(isUserAdminSelector);
  const user = useSelector(userSelector);
  const isUserLoggedIn = !!user?.id;
  const pointerEvents = isChangePasswordPath ? "none" : "auto";

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
            {isUserLoggedIn && (
              <Typography>Welcome back, {user.username}</Typography>
            )}
          </Link>
        </Stack>
        {!isUserLoggedIn && (
          <Button
            disabled={isChangePasswordPath}
            size="small"
            color={isAuthenticationPath ? "secondary" : "primary"}
          >
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              to={routesConfig.authentication.browserRouter.path}
            >
              Authentication
            </Link>
          </Button>
        )}
        {isUserLoggedIn && (
          <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
            <Button
              disabled={isChangePasswordPath}
              size="small"
              color={isHomePath ? "secondary" : "primary"}
            >
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to={routesConfig.home.browserRouter.path}
              >
                Home
              </Link>
            </Button>
            {isUserAdmin && (
              <>
                <Button
                  disabled={isChangePasswordPath}
                  size="small"
                  color={isAllUsersPath ? "secondary" : "primary"}
                >
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to={routesConfig.allUsers.browserRouter.path}
                  >
                    All Users
                  </Link>
                </Button>
                <Button
                  size="small"
                  color={isNewUserPath ? "secondary" : "primary"}
                >
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to={routesConfig.newUser.browserRouter.path}
                  >
                    new User
                  </Link>
                </Button>
              </>
            )}
            <Button
              color="error"
              onClick={() => {
                localStorage.clear();
                dispatch(clearUser());
                if (!isAuthenticationPath) {
                  return navigate(
                    routesConfig.authentication.browserRouter.path
                  );
                }
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
