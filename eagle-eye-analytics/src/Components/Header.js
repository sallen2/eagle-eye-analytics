import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  color: {
    backgroundColor: "#282829"
  },
  links: {
    textDecoration: "none",
    color: "white"
  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.color}>
        <Toolbar>
          <img src='./2-22708_eagle-eye-clip-art.png' width='40px' height="40px" />
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Eagle Eye Analytics
          </Typography>
          <Button color="inherit"><a className={classes.links} href="#Description">What</a></Button>
          <Button color="inherit"><a className={classes.links} href="#How">How</a></Button>
          <Button color="inherit"><a className={classes.links} href="#TheTeam">The Team</a></Button>
          <Button color="inherit"><a className={classes.links} href="#Cams">Cams</a></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);