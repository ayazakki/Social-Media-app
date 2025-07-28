"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/lib/Redux/store";
import { clearUser, getUserData } from "@/lib/Redux/slices/userSlice";
import { deleteCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import Diversity1Icon from '@mui/icons-material/Diversity1';

const pages = [
  {
    text: "Profile",
    link: "profile",
  },
  {
    text: "TimeLine",
    link: "/",
  },
];
const settings = [
  {
    text: "Login",
    link: "login",
  },
  {
    text: "Register",
    link: "register",
  },
];

function Navbar() {
  const router = useRouter()
  function handleLogout(){
    deleteCookie("token")
    dispatch(clearUser())
    router.push("/login")

  }
  const { user } = useSelector(
    (store: { userReducer: UserSlice }) => store.userReducer
  );
  const dispatch = useDispatch<typeof store.dispatch>();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    dispatch(getUserData());
  }, []);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Diversity1Icon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Social
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {user?<>
              {pages.map((page) => (
                <MenuItem key={page.link} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    href={`/${page.link}`}
                    sx={{ textAlign: "center" ,textDecoration:"none",color:"#1976d2"}}
                  >
                    {page.text}
                  </Typography>
                </MenuItem>
              ))}</>:""}
            </Menu>
          </Box>
          <Diversity1Icon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}/>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Social
          </Typography>
          {user?<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.link}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Typography
                  component={Link}
                  href={`/${page.link}`}
                  sx={{ textAlign: "center" ,textDecoration:"none", color:"white"}}
                >
                  {page.text}
                </Typography>
              </Button>
            ))}
          </Box>:""}
          <Box sx={{ flexGrow: 0 ,marginLeft:"auto"}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user?.photo} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px"}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.link} onClick={handleCloseUserMenu}>
                  <Typography
                    component={Link}
                    href={`/${setting.link}`}
                    sx={{
                      textAlign: "center",
                      textDecoration: "none",
                      color: "#1976d2",
                    }}
                  >
                    {setting.text}
                  </Typography>
                </MenuItem>
              ))}
              {user ? (
                <MenuItem key={"logout"} onClick={()=>{
                  handleCloseNavMenu()
                  handleLogout()
                }}>
                  <Typography component={"button"} sx={{ textAlign: "center" ,bgcolor:"red",color:"white",paddingInline:"3px",borderColor:"white"}}>
                    Logout
                  </Typography>
                </MenuItem>
              ) : (
                ""
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
