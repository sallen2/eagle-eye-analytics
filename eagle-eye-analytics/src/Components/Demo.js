import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography} from '@material-ui/core/';
import plotlyImage from '../Assets/newplot.png'


const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 20,
        // paddingBottom: theme.spacing.unit * 20,
        height: "100%",
        // backgroundColor: "lightgrey",
        overflow: 'hidden',
        borderRadius: 5
    },
    bottomGrids: {
        paddingTop: theme.spacing.unit *30
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
    console.log('inside demo',props.refresh)
    return (
        <section className={classes.root} id="Cams">
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h4" className={classes.title}>
                            Aggregate Percent Per Booth
                        </Typography>
                        <iframe key={props.refresh} width="700" height="700" frameBorder="0" scrolling="no"  src="//plot.ly/~elbowphat/0/#/"></iframe>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4" className={classes.title}>
                            Percent of Uniques
                        </Typography>
                        <iframe key={props.refresh} width="700" height="700" frameborder="0"  scrolling="no" src="//plot.ly/~elbowphat/6.embed"></iframe>
                    </Grid>
                </Grid>
                <Grid container className={classes.bottomGrids}>
                    <Grid item xs={6}>
                        <Typography variant="h4" className={classes.title}>
                            Concentration Over Time
                        </Typography>
                        <iframe key={props.refresh} width="700" height="700" frameBorder="0" scrolling="no" src="//plot.ly/~elbowphat/2/cam-1-crowd-concentration-cam-2-cc-cam-3-cc-cam-4-cc/#/"></iframe>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4" className={classes.title}>
                            Unique Counts 
                        </Typography>
                        <iframe key={props.refresh} width="700" height="700" frameborder="0" scrolling="no" src="//plot.ly/~elbowphat/4/#/"></iframe>
                    </Grid>
                </Grid>
                    {/* <img style={{ display: 'block' }} src={plotlyImage} alt="" /> */}
        </section>
    )
}

export default withStyles(styles)(Demo);