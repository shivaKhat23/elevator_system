import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import WaterfallChartOutlinedIcon from '@mui/icons-material/WaterfallChartOutlined';
import { Breadcrumbs, CssBaseline } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 260;

interface SideNavigationItem {
  name: string;
  to: string;
  icon: JSX.Element;
}

const navigation: SideNavigationItem[] = [
  {
    name: 'elevator',
    to: '/app/elevator',
    icon: <WaterfallChartOutlinedIcon />,
  },
  {
    name: 'admin',
    to: '/app/admin',
    icon: <CreateOutlinedIcon />,
  },
  {
    name: 'settings',
    to: '/app/settings',
    icon: <SettingsOutlinedIcon />,
  },
];

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentNavigation = navigation.find((x) => x.to === pathname);

  const handleNavigation = (navigateTo: string) => {
    navigate(navigateTo);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        sx={{
          bgcolor: 'white',
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
        elevation={1}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ paddingY: 1, paddingX: 1.5 }}>
          <Typography color="text.secondary" variant="body1">
            Home
          </Typography>
          <Typography color="text.primary" variant="body1">
            {currentNavigation && t(currentNavigation.name)}
          </Typography>
        </Breadcrumbs>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ marginTop: -3.5 }}>
            Elevator Company
          </Typography>
        </Toolbar>
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {navigation.map(({ name, to, icon }) => (
              <ListItem key={name} disablePadding onClick={() => handleNavigation(to)}>
                <ListItemButton selected={pathname === to}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={t(name)} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
};
