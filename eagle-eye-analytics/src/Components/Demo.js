import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography} from '@material-ui/core/';
import plotlyImage from '../Assets/newplot.png'


const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 20,
        height: "100vh",
        // backgroundColor: "lightgrey",
        overflow: 'hidden',
        borderRadius: 5
    },
    title: {
        textAlign: "center",
    },
    media: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%"
    },
    text: {
        // lineHeight: 2,
        padding: "10vh"      
    },
    paper: {
        height: "100vh",
    },
});

function Demo(props) {
    const { classes } = props;
    return (
        <section className={classes.root}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h4" className={classes.title} component="h2">
                            Peak Times Per Booth 
                        </Typography>
                        <iframe className={classes.images} width="700" height="700" frameborder="0" scrolling="no" align="left" src="//plot.ly/~all22_NFL/0.embed"></iframe>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4" className={classes.title} component="h2">
                            Percent Per Booth
                        </Typography>
                        <iframe width="700" height="700" frameborder="0" scrolling="no" align="right" src="//plot.ly/~all22_NFL/4.embed"></iframe>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs>
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
                </Grid>
                    {/* <img style={{ display: 'block' }} src={plotlyImage} alt="" /> */}
        </section>
    )
}

export default withStyles(styles)(Demo);