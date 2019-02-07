import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const backgroundImage =
    'https://bitcoinist.com/wp-content/uploads/2018/10/shutterstock_567338095-e1540273758803.jpg';

const styles = theme => ({
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
        height: "93vh",
        width: "auto",
    },
    overlay: {
        position: "relative",
        display: "block",
        width: "auto",
        height: "93vh",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1
    },
    text: {
        position: "absolute",
        top: "50%",
        left: "50%",
        fontSize: 50,
        color: "white",
        transform: "translate(-50%,-50%)",
        msTransform: "translate(-50%,-50%)",
        zIndex: 2
    }

});

function Hook(props) {
    const { classes } = props;
    return (
        <div className={classes.background}>
            <div className={classes.overlay}>
                <img style={{ display: 'none' }} src={backgroundImage} alt="" />
            </div>
            <div className={classes.text}>
                <Typography className={classes.header} color="inherit" align="center" variant="h2" marked="center">
                    Free The Data
                </Typography>
                <Typography className={classes.caption} color="inherit" align="center" variant="h5">
                    Analyze the market
                </Typography>
            </div>
        </div>
    )
}

export default withStyles(styles)(Hook);
