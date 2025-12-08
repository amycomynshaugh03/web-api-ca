import React, { useState, useEffect, useContext } from "react";
import {AppBar,Toolbar,Typography,Tabs,Tab,IconButton,Menu,MenuItem,Button,Box} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AuthContext } from "../../contexts/authContext";



const SiteHeader = () => {
  const { isAuthenticated, userName, signout } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [tabValue, setTabValue] = useState(false);

  const menuOptions = [
    { label: "Home", path: "/home" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Playlist", path: "/movies/playlist" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Trending Today", path: "/movies/trending/today" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Top Rated", path: "/movies/top-rated" },
    { label: "Now Playing", path: "/movies/now-playing" },
  ];

  
  const authOptions = isAuthenticated
    ? [
        { label: "Tasks", path: "/tasks" },
        { label: "Profile", path: "/profile" },
      ]
    : [
        { label: "Login", path: "/login" },
        { label: "Signup", path: "/signup" },
      ];

  const allMenuOptions = isAuthenticated
  ? [...menuOptions, ...authOptions] 
  : authOptions;                   


  useEffect(() => {
    const currentIndex = allMenuOptions.findIndex(
      (opt) => opt.path === location.pathname
    );
    setTabValue(currentIndex !== -1 ? currentIndex : false);
  }, [location.pathname]);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
    navigate(allMenuOptions[newValue].path);
  };

  const handleMenuSelect = (path) => {
    setAnchorEl(null);
    navigate(path);
  };

  return (
    <>
      <AppBar sx={{ background: "linear-gradient(90deg,#2196f3,#64b5f6)", boxShadow: 4 }}>
  <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
    
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Typography
        variant="h6"
        sx={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
      >
        TMDB Client
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ color: "#e3f2fd", fontFamily: "'Roboto', sans-serif'" }}
      >
        All you ever wanted to know about Movies!
      </Typography>
    </Box>

    
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {isAuthenticated ? (
        <>
          <Typography variant="body1">Welcome {userName}!</Typography>
          <Button
            variant="contained"
            color="error"
            onClick={signout}
            sx={{ textTransform: "none" }}
          >
            Sign out
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          onClick={() => navigate("/login")}
          sx={{ textTransform: "none" }}
        >
          Login
        </Button>
      )}

      {isAuthenticated && (
  isMobile ? (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {allMenuOptions.map((opt) => (
          <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
            {opt.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  ) : (
    <Tabs value={tabValue} onChange={handleTabChange} textColor="inherit">
      {allMenuOptions.map((opt) => (
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
         )
        )}
        </Box>
        </Toolbar>
        </AppBar>

      <div style={{ minHeight: "64px" }} />
    </>
  );
};

export default SiteHeader;
