import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card, CardActionArea, CardMedia } from '@material-ui/core/';
// import pexelIphone from '../Assets/iphoneRekognition.jpg'
import pexelCity from '../Assets/pexelCity.png'
// import prismBackground from '../Assets/prism.png'


const styles = theme => ({
    root: {
        flexGrow: 1,
        // paddingTop: theme.spacing.unit * 20,
        paddingBottom: theme.spacing.unit * 10,
        paddingLeft: theme.spacing.unit * 5,
        paddingRight: theme.spacing.unit * 5,
        backgroundColor: "grey",
    },
    paper: {
        // color: theme.palette.text.secondary,
        // backgroundImage: {prismBackground},
        height: "50vh",
    },
    text: {
        lineHeight: 2,
        paddingTop: "25vh",
        // position: "relative",
        // zIndex: 2,
        color: "white"
    },
    card: {
        // 911 × 607
        height: 695,
    },
    media: {
        height: "695px",
        // position: "relative",
        // zIndex: 2
    },
    backgroundImage: {
        position: "absolute",
        zIndex: 1,
        height: "100%",
        width: "100%",
        marginLeft: 0,
    }
});

function HowItWorks(props) {
    const { classes } = props;

    return (
        <div>
            {/* <img className={classes.backgroundImage} src={prismBackground} /> */}
            <div className={classes.root} id="How">
                <Grid container spacing={40}>
                    <Grid item xs={12} md={6}>
                        <div className={classes.paper}>
                            <Typography className={classes.text} variant="h5">
                                Eagle Eye's Proprietary algorithms return a detailed analysis of how many people
                                were in each area at each time, as well as an aggregate number of unique people who
                                visit each area, tabulated in real time. Eagle Eye Analytics can also take a live
                                photo of a person and produce an album of thumbnails that were captured containing
                                that particular person.
                        </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card className={classes.card} raised="true">
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={pexelCity}
                                    title=""
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

HowItWorks.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HowItWorks);