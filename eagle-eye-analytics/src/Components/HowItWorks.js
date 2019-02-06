import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Typography, Card, CardActionArea, CardMedia} from '@material-ui/core/';
import phoneImage from '../Assets/iphoneRekognition.jpg'
import prismBackground from '../Assets/prism.png'



// const backgroundImage =
//     'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/JrbItQz/technology-network-loop-background_vxe4qnnce__F0000.png';

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing.unit * 20,
        paddingBottom: theme.spacing.unit * 20,
        paddingLeft: theme.spacing.unit * 5,
        paddingRight: theme.spacing.unit * 5,
        backgroundColor: "lightgrey"
      },
    paper: {
        // color: theme.palette.text.secondary,
        // backgroundImage: {prismBackground},
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

function HowItWorks(props) {
    const { classes } = props;

    return (
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
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={phoneImage}
                            title=""
                            />
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </div>
        
    );
}

HowItWorks.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HowItWorks);