import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const backgroundImage =
    'https://bitcoinist.com/wp-content/uploads/2018/10/shutterstock_567338095-e1540273758803.jpg';

const styles = {
    header: {
        color: "white",
        paddingTop: 200
    },
    caption: {
        color: "white",
        paddingTop: 100,
    },
    background: {
        backgroundImage: `url(${backgroundImage})`,
        // backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: '100%',
        // backgroundRepeat: 'no-repeat',
        height: "75vh",
        width: "auto",
    }
};

function Hook(props) {
    const { classes } = props;
    return (
        <div className={classes.background}>
            <img style={{ display: 'none' }} src={backgroundImage} alt="" />
            <Typography className={classes.header} color="inherit" align="center" variant="h2" marked="center">
                Free The Data
            </Typography>
            <Typography className={classes.caption} color="inherit" align="center" variant="h5">
                Analyze the market
            </Typography>
        </div>
    )
}

export default withStyles(styles)(Hook);
