import React, { useState, useEffect, useContext } from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab, IconButton, Menu, MenuItem, Button, Box } from "@mui/material";
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

  const privateOptions = [
    { label: "Home", path: "/home" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Playlist", path: "/movies/playlist" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Trending Today", path: "/movies/trending/today" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Top Rated", path: "/movies/top-rated" },
    { label: "Now Playing", path: "/movies/now-playing" },
    { label: "My Reviews", path: "/reviews/my-reviews" },
    { label: "Profile", path: "/profile" },
  ];

  const publicOptions = [
    { label: "Login", path: "/login" },
    { label: "Signup", path: "/signup" },
  ];

  const allMenuOptions = isAuthenticated ? privateOptions : publicOptions;

  useEffect(() => {
    const currentIndex = allMenuOptions.findIndex(
      (opt) => opt.path === location.pathname
    );
    setTabValue(currentIndex !== -1 ? currentIndex : false);
  }, [location.pathname, allMenuOptions]);

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
      <Box
        sx={{
          width: "100%",
          height: "30px",
          backgroundColor: "#1a237e",
          display: "flex",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1201,
          boxShadow: 2,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "marquee 15s linear infinite",
            "@keyframes marquee": {
              "0%": { transform: "translateX(100%)" },
              "100%": { transform: "translateX(-100%)" }
            }
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "0.9rem",
              fontWeight: "bold",
              letterSpacing: "2px",
              fontFamily: "'Roboto', sans-serif",
              px: 10
            }}
          >
            🎄 Merry Christmas from TMDB 🎄 & Happy New Year 🎄 See the latest Movies here 🎄
          </Typography>
        </Box>
      </Box>

      <AppBar 
        sx={{ 
          background: "linear-gradient(90deg,#2196f3,#64b5f6)", 
          boxShadow: 4,
          top: "30px" 
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" sx={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
              TMDB Client
            </Typography>
            {!isMobile && (
              <Typography variant="subtitle1" sx={{ color: "#e3f2fd", fontFamily: "'Roboto', sans-serif" }}>
                Movies & Reviews
              </Typography>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isAuthenticated && (
              <Typography variant="body1" sx={{ mr: 1 }}>Welcome {userName}!</Typography>
            )}

            {isMobile ? (
              <>
                <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <MenuIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                  {allMenuOptions.map((opt) => (
                    <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                      {opt.label}
                    </MenuItem>
                  ))}
                  {isAuthenticated && (
                    <MenuItem onClick={signout} sx={{ color: "error.main" }}>Sign Out</MenuItem>
                  )}
                </Menu>
              </>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tabs value={tabValue} onChange={handleTabChange} textColor="inherit" indicatorColor="secondary">
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
                {isAuthenticated && (
                  <Button variant="contained" color="error" onClick={signout} sx={{ textTransform: "none", ml: 2 }}>
                    Sign out
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          width: "100%",
          height: "15px",
          position: "fixed",
          top: "94px",
          left: 0,
          zIndex: 1200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          "&::before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "2px",
            backgroundColor: "#0a3d0e",
            top: "0px",
            zIndex: -1,
          },
          "@keyframes simpleTwinkle": {
            "0%, 100%": { opacity: 0.5, transform: "scale(1)" },
            "50%": { opacity: 1, transform: "scale(1.2)", boxShadow: "0 0 10px currentColor" }
          }
        }}
      >
        {[
          "#ff1744", "#00e676", "#ffea00", "#2979ff", "#ff1744", 
          "#00e676", "#ffea00", "#2979ff", "#ff1744", "#00e676"
        ].map((color, index) => (
          <Box
            key={index}
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: color,
              color: color,
              animation: `simpleTwinkle 1.5s infinite ${index * 0.2}s`,
              border: "1px solid rgba(0,0,0,0.2)",
              mt: "2px"
            }}
          />
        ))}
      </Box>

      <div style={{ minHeight: "115px" }} />
    </>
  );
};

export default SiteHeader;