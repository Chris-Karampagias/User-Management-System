import { useDispatch, useSelector } from "react-redux";
import { Paper, Stack, Typography, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userSelector, isUserAdminSelector } from "../../models/user/selectors";
import { routesConfig } from "../../app";
import { clearUser } from "../../models/user/actions";

export function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isUserAdmin = useSelector(isUserAdminSelector);
  const user = useSelector(userSelector);
  const isUserLoggedIn = !!user?.id;
  const pathname = location.pathname;
  const isHome = pathname === routesConfig.home.browserRouter.path;
  const isAllUsers = pathname === routesConfig.allUsers.browserRouter.path;
  const isChangePassword =
    pathname === routesConfig.changePassword.browserRouter.path;
  const isAuthentication =
    pathname === routesConfig.authentication.browserRouter.path;
  const isNewUser =
    pathname === routesConfig.newUser.browserRouter.path;
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
            {isUserLoggedIn && (
              <Typography>Welcome back, {user.username}</Typography>
            )}
          </Link>
        </Stack>

        {isUserLoggedIn && (
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
            {isUserAdmin && (
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
                  size="small"
                  color={isNewUser ? "secondary" : "primary"}
                >
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to={routesConfig.newUser.browserRouter.path}
                  >
                    new User
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
                localStorage.clear();
                dispatch(clearUser());
                if (!isAuthentication) {
                  return navigate(
                    routesConfig.authentication.browserRouter.path
                  )
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
