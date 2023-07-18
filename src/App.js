import React, { useState } from "react";

// components
import { ReactComponent as RLLogo } from "./components/svgs/RastonLabLogo.svg";
import Popup from "./components/Popup";

// dictionary
import { menuItems } from "./dictionaries/menuItems";

// router
import { Outlet, Link } from "react-router-dom";

// style
import "./style/App.css";

// Icons
import InfoIcon from '@mui/icons-material/Info';
import { GitHub } from "@mui/icons-material";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import DevMode from "./components/DevMode";
import { Accordion, AccordionDetails, AccordionSummary, Drawer, Popover } from "@mui/material";

export default function App() {

  const [expanded, setExpanded] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [gitHubPopover, setGutHubPopover] = useState(false);
  const [infoPopover, setInfoPopover] = useState(false);

  const handleChange = (panel) => (newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleOpenNavMenu = () => {
    setDrawer(true);
  };

  const handleCloseNavMenu = () => {
    setDrawer(false);
  };

  const openGitHubPopover = (event) => {
    setGutHubPopover(event.currentTarget);
  }

  const closeGitHubPopover = () => {
    setGutHubPopover(null);
  }

  const openInfoPopover = (event) => {
    setInfoPopover(event.currentTarget);
  }

  const closeInfoPopover = () => {
    setInfoPopover(null);
  }

  return (  
    <div>  
      <AppBar className="nav-area" position="static">
        <Container maxWidth="xl" sx={{paddingLeft: {xs: 0}}}>
          <Toolbar
            sx={{  
              alignItems: "flex-start",
              padding: "10px",
              margin: "0",
              justifySelf: "left"
            }}
          >
            {/* Start Small Menu */}
            <Box sx={{ flexGrow: 0.1, display: { xs: 'flex', lg: 'none' } }}>
              <IconButton
                size="large"
                aria-label="Menu and Navigation"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
              <MenuIcon />
              </IconButton>
              <Drawer
                open={drawer}
                anchor={"left"}
                onClose={handleCloseNavMenu}
                className="mini-menu"
              >
                <Box>
                {menuItems.map((page) => (
                  <Accordion
                    square
                    expanded={expanded === page.label}
                    onChange={handleChange(page.label)}
                    onMouseLeave={handleChange("")}
                    disableGutters
                  >
                    <AccordionSummary
                      className="menu-items"
                    >
                      {page.label}
                    </AccordionSummary>
                    <AccordionDetails
                      className="dropdown-items"
                    >
                      {page.submenu.map((submenu) => {
                        if (submenu.button) {
                          return (
                              <Popup
                                label={submenu.label}
                                title={submenu.title}
                                text={submenu.text}
                              />
                          );
                        } else if (submenu.link) {
                          return (
                            <p>
                              <Link to={submenu.link ?? "#"} onClick={submenu.action}>
                                {submenu.label}
                              </Link>
                            </p>
                          );
                        } else {
                          return (<ul>{submenu.component}</ul>)
                        }
                      })}
                    </AccordionDetails>
                  </Accordion>
                ))}
                </Box>
              </Drawer>
            </Box>
            {/* End Small Menu */}

            {/* Start Logo and Title */}
            <a className="logolink" target="_blank" rel="noreferrer" href="https://www.rastonlab.org/">
              <RLLogo width={50} height={50} viewBox="0 0 100 100" />
            </a>
            <Link className="logo" to="/" >
              <span className="red"   >F</span>
              <span className="orange">T</span>
              <span className="yellow">I</span>
              <span className="green" >R</span>
              <span className="teal"  >-</span>
              <span className="blue"  >S</span>
              <span className="indigo">I</span>
              <span className="purple">S</span>
            </Link>
            {/* End Logo and Title */}

            {/* Start Full Sized Menu */}
            {menuItems.map((page) => (
            <Accordion
              square
              expanded={expanded === page.label}
              onChange={handleChange(page.label)}
              onMouseLeave={handleChange("")}
              sx={{
                display: { xs: 'none', lg: 'block' },
                boxShadow: "none"
              }}
              disableGutters
            >
              <AccordionSummary
                className="menu-items"
              >
                {page.label}
              </AccordionSummary>
              <AccordionDetails
                className="dropdown-items"
              >
                {page.submenu.map((submenu) => {
                  if (submenu.button) {
                    return (
                        <Popup
                          label={submenu.label}
                          title={submenu.title}
                          text={submenu.text}
                        />
                    );
                  } else if (submenu.link) {
                    return (
                      <p>
                        <Link to={submenu.link ?? "#"} onClick={submenu.action}>
                          {submenu.label}
                        </Link>
                      </p>
                    );
                  } else {
                    return (<ul>{submenu.component}</ul>)
                  }
                })}
              </AccordionDetails>
            </Accordion>
            ))}
            {/* End Full Sized Menu */}
            <div className="left-cluster">
              <DevMode />
              <GitHub className="icon" sx={{fontSize: "35px"}} onMouseEnter={openGitHubPopover} onMouseLeave={closeGitHubPopover} />
              <InfoIcon className="icon" sx={{fontSize: "38px"}} onMouseEnter={openInfoPopover} onMouseLeave={closeInfoPopover} />

              <Popover
                sx={{pointerEvents: 'none'}}
                open={Boolean(gitHubPopover)}
                anchorEl={gitHubPopover}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                If you are interested in the code behind <br /> this project check out our 
                <a
                href="https://github.com/RastonLab/Virtual-FTIR-Spectrometer#readme"
                target="_blank"
                rel="noreferrer"
                >
                  GitHub!
                </a>
              </Popover>

              <Popover
                sx={{pointerEvents: 'none'}}
                open={Boolean(infoPopover)}
                anchorEl={infoPopover}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                A core part of this project is 
                <a 
                  href="https://github.com/radis/radis#readme" 
                  target="_blank" 
                  rel="noreferrer"
                >
                   RADIS
                </a>
              </Popover>

            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet/>
    </div>
  );
}
