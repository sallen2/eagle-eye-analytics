import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Typography, Card, CardActionArea, CardMedia} from '@material-ui/core/';
import peopleTrackingImage from '../Assets/amazonRekognition.jpg'



// const backgroundImage =
//     'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/JrbItQz/technology-network-loop-background_vxe4qnnce__F0000.png';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing.unit * 20
      },
    paper: {
        // color: theme.palette.text.secondary,
        // backgroundColor: "lightgrey",
        height: "50vh",
    },
    text: {
        lineHeight: 2,
        paddingTop: "5vh"      
    },
    card: {
        // maxWidth: 345,
    },
    media: {
        height: "50vh"
    }
});

function Description(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <Grid container spacing={40}>
                <Grid item xs>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={peopleTrackingImage}
                            title=""
                            />
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs>
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
        
    );
}

Description.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Description);