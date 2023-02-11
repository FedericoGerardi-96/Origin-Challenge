import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Divider,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { startLogOut } from "../../store/auth";

import OriginLogo from "../../public/OriginLogo.svg";

const settings = ["Logout"];

export const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user } = useAppSelector((state: any) => state.auth);
  const { name } = user;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogOut = async () => {
    dispatch(startLogOut());
    router.replace("/auth/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }} disableGutters>
          <Link href="/">
            <Image src={OriginLogo} alt={"OriginLogo"} width={100} height={100} />
          </Link>
          <Box sx={{ display: "flex", gap: 3, flexGrow: 0, flexDirection: "row", alignItems: "center" }}>
            <Box>
              <Typography
                sx={{ display: "flex", gap: 3, flexDirection: "column", alignItems: "center" }}
                textAlign="center"
              >
                Usuario:
              </Typography>
              <Divider light />

              <Typography textAlign="center">{name}</Typography>
            </Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="avatar logo" src="/Logo.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
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
                <MenuItem sx={{ flexDirection: "column" }} key={setting} onClick={handleCloseUserMenu}>
                  <Typography onClick={onLogOut} textAlign="center">
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
