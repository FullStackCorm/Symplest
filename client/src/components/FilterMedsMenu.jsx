import * as React from 'react';
import { Button, Menu, MenuItem } from '@mui/material'

export default function FilterMedsMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="filter-meds-button"
        aria-controls={open ? 'filter-meds-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Filter Medications
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
    </div>
  );
}