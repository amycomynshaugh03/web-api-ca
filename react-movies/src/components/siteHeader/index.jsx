import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [tabValue, setTabValue] = useState(false);

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Playlist", path: "/movies/playlist" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Trending Today", path: "/movies/trending/today" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Top Rated", path: "/movies/top-rated" },
    { label: "Now Playing", path: "/movies/now-playing" },
  ];

  useEffect(() => {
    const currentIndex = menuOptions.findIndex((opt) => opt.path === location.pathname);
    setTabValue(currentIndex !== -1 ? currentIndex : false);
  }, [location.pathname]);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
    navigate(menuOptions[newValue].path);
  };

  const handleMenuSelect = (path) => {
    setAnchorEl(null);
    navigate(path);
  };

  return (
    <>
      <AppBar sx={{ background: "linear-gradient(90deg,#2196f3,#64b5f6)", boxShadow: 4 }}>
        <Toolbar sx={{ flexWrap: "wrap", gap: 2 }}>
          <Typography
            variant="h4"
            sx={{ flexGrow: 1, fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            TMDB Client
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ flexGrow: 1, color: "#e3f2fd", fontFamily: "'Roboto', sans-serif" }}
          >
            All you ever wanted to know about Movies!
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                    sx={{ "&:hover": { backgroundColor: "#bbdefb" } }}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Tabs
           value={tabValue}
          onChange={handleTabChange}
          textColor="inherit"

          >
          {menuOptions.map((opt) => (
          <Tab
          key={opt.label}
          label={opt.label}
          sx={{
          color: "#fff",
          fontWeight: 500,
         "&:hover": { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 2 },
        }}
        />
        ))}
        </Tabs>

          )}
        </Toolbar>
      </AppBar>
      <div style={{ minHeight: "64px" }} />
    </>
  );
};

export default SiteHeader;
