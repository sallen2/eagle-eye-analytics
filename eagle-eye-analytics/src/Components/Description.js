import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Typography} from '@material-ui/core/';


const backgroundImage =
    'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/JrbItQz/technology-network-loop-background_vxe4qnnce__F0000.png';

const styles = theme => ({
    background: {
        flexGrow: 1,
        // backgroundImage: `url(${backgroundImage})`,
        backgroundColor: 'slategrey', // Average color of the background image.
        backgroundPosition: '100%',
        backgroundRepeat: 'no-repeat',
        height: "100%"
    },
    heading: {
        marginTop: theme.spacing.unit * 5,
        padding: theme.spacing.unit * 5,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    body: {
        marginBottom: theme.spacing.unit * 10,
        fontSize: 20,
        lineHeight: 2
    },
    image: {
        opacity: .9,
        display: 'none'
    }
});

function Description(props) {
    const { classes } = props;

    return (
        <div className={classes.background}>
            <img className={classes.image} src={backgroundImage} alt="" />
            <Grid container>
                <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <Typography className={classes.heading} variant="h3">What</Typography>
                        <Typography className={classes.body} variant="body1">Eagle Eye Analytics is an area analysis software designed to help users determine crowd size over time at designated areas. Our team built a custom  API for Netgear Arlo cameras which allows recorded videos and their thumbnails to be analyzed by AWS Rekognition. Using data returned by Rekogntion, Eagle Eye's Proprietary algorithms return a detailed analysis of how many people were in each area at each time, in real time.
                        </Typography>
                    </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </div>
    );
}

Description.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Description);