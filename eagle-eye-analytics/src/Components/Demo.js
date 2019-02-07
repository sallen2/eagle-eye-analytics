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
    console.log('inside demo',props.refresh)
    return (
        <section className={classes.root} id="Cams">
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" className={classes.title}>
                            Peak Times Per Booth 
                        </Typography>
                        <iframe key={props.refresh} width="700" height="700" frameBorder="0" scrolling="no" align="left" src="//plot.ly/~all22_NFL/8.embed"></iframe>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" className={classes.title}>
                            Percent Per Booth
                        </Typography>
                        <iframe key={props.refresh} width="700" height="700" frameBorder="0" scrolling="no" align="right" src="//plot.ly/~all22_NFL/10.embed"></iframe>
                    </Grid>
                </Grid>
                    {/* <img style={{ display: 'block' }} src={plotlyImage} alt="" /> */}
        </section>
    )
}

export default withStyles(styles)(Demo);