import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card, CardActionArea, CardMedia } from '@material-ui/core/';
import pexelFriends from '../Assets/pexelFriends.png'
// import prismBackground from '../Assets/prism.png'


const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing.unit * 20,
        paddingBottom: theme.spacing.unit * 20,
        paddingLeft: theme.spacing.unit * 5,
        paddingRight: theme.spacing.unit * 5,
        backgroundColor: "grey"
    },
    paper: {
        height: "50vh",
    },
    card: {
        // 695 × 594
        height: 695,
    },
    media: {
        height: "695px",
        // position: "relative",
        // zIndex: 2
    },
    text: {
        lineHeight: 2,
        paddingTop: "25vh",
        // position: "relative",
        // zIndex: 2,
        color: "white"
    },
    backgroundImage: {
        position: "absolute",
        zIndex: 1,
        height: "100%",
        width: "100%",
        marginLeft: 0,
    }
});

function Description(props) {
    const { classes } = props;

    return (
        <div>
            {/* <img className={classes.backgroundImage} src={prismBackground} /> */}
            <div className={classes.root} id="Description">
                <Grid container spacing={40}>
                    <Grid item xs={12} md={6}>
                        <Card className={classes.card} raised="true">
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={pexelFriends}
                                    title=""
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className={classes.paper}>
                            <Typography className={classes.text} variant="h5">
                                Eagle Eye Analytics is an area analysis software designed
                                to help users determine crowd size over time at designated
                                areas. Our team built a custom  API for Netgear Arlo cameras
                                which allows recorded videos and their thumbnails to be
                                analyzed by AWS Rekognition. Using data returned by
                                Rekogntion, Eagle Eye's Proprietary algorithms return a detailed
                                analysis of how many people were in each area at each time, in real time.
                        </Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

Description.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Description);