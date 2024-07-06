import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import PrintIcon from '@mui/icons-material/Print';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

export default function ResponsiveDialog({parsed}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const columns = [
        { field: 'id', headerName: 'ID'},
        { field: 'room', headerName: 'Room'},
        { field: 'date', headerName: 'Date'},
        { field: 'time', headerName: 'Time'},
        { field: 'activities', headerName: 'activities'}
      ];


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }


  return (
    <React.Fragment>
      <Button variant="outlined" fullWidth startIcon={<PrintIcon />} onClick={handleClickOpen}>
        Print
      </Button>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"You may print the activity logs here"}
        </DialogTitle>
        <DialogContent>
                <DataGrid
                    columns={columns}
                    rows={parsed}
                    autoHeight 
                    slots={{
                    toolbar: CustomToolbar,
                    }}
                />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}