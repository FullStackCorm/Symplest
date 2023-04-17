import * as React from 'react';
import { Button, Menu, MenuItem } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { brown, blue, ivory } from '../colors';

const theme = createTheme({
  palette: {
      primary: {
      main: blue[700],
      light: blue[400],
      dark: blue[800],
      contrastText: brown[50]
      },
      secondary: {
          main: brown[100],
          light: brown[50],
          dark: brown[300],
          contrastText: brown[700]
      },
      text: {
          main: ivory[50]
      }
  }
});

const filterButtonStyle = {
  bgcolor: 'primary.main',
  color: 'text.main',
  borderRadius: 5,
  pl: 2,
  pr: 2,
  m: 1,
  '&:hover': {
    bgcolor: 'primary.light',
    color: 'text.main'
  }
}

const FilterMedsMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        id="filter-meds-button"
        aria-controls={open ? 'filter-meds-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={filterButtonStyle}
      >
        Filter Medications <ArrowDropDownIcon />
      </Button>
      <Menu
        id="filter-meds-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'filter-meds-button',
        }}
      >
        <MenuItem onClick={handleClose}>By Time of Day</MenuItem>
        <MenuItem onClick={handleClose}>By Prescriber</MenuItem>
      </Menu>
    </ThemeProvider>
  );
}

export default FilterMedsMenu