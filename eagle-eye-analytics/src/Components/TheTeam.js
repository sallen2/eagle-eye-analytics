import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card, CardActionArea, CardMedia } from '@material-ui/core/';
import Jrew from '../Assets/jrewProfile.jpg';
import Uday from '../Assets/uday.jpeg';
import Stephan from '../Assets/stephan.jpeg';
import Jeremy from '../Assets/jeremy.jpeg';
// import prismBackground from '../Assets/prism.png'


const styles = theme => ({
    root: {
        flexGrow: 1,
        // paddingTop: theme.spacing.unit * 20,
        // paddingBottom: theme.spacing.unit * 10,
        paddingLeft: theme.spacing.unit * 5,
        paddingRight: theme.spacing.unit * 5,
        backgroundColor: "grey",
    },
    paper: {
        height: "40vh",
    },
    text: {
        lineHeight: 2,
        color: "white",
        textAlign: "center",
        paddingTop: 25,
        // paddingTop: "25vh",
        // position: "relative",
        // zIndex: 2,
    },
    textBody: {
        lineHeight: 2,
        color: "white",
        textAlign: "center",
    },
    imagePosition: {
        marginLeft: "20%"
    },
    card: {
        // 911 × 607
        height: 300,
        width: 300,
        borderRadius: "100%",
    },
    media: {
        // height: "60vh",
        position: "relative",
        // left: -10,
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

function TheTeam(props) {
    const { classes } = props;

    return (
        <div>
            {/* <img className={classes.backgroundImage} src={prismBackground} /> */}
            <div className={classes.root} id="TheTeam">
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className={classes.text} variant="h2">The Team!</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <div className={classes.imagePosition}>
                            <img className={classes.card} src={Jrew} />
                        </div>
                        <div className={classes.paper}>
                            <Typography className={classes.text} variant="h4">Jrew Mohamed</Typography>
                            <Typography className={classes.textBody} variant="h6"><a style={{ textDecoration: "none", color: "blue" }} href="https://www.linkedin.com/in/jrewmohamed/">LinkedIn</a></Typography>
                            <Typography className={classes.textBody} variant="h6"><a style={{ textDecoration: "none", color: "blue" }} href="https://github.com/JrewGit">Github</a></Typography>
                            <Typography className={classes.textBody} variant="h6"><a style={{ textDecoration: "none", color: "blue" }} href="mailto:jrewmohamed@gmail.com">Email</a></Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <div className={classes.imagePosition}>
                            <img className={classes.card} src={Uday} />
                        </div>
                        <div className={classes.paper}>
                            <Typography className={classes.text} variant="h4">Uday Sachdeva</Typography>
                            <Typography className={classes.textBody} variant="h6"><a style={{ textDecoration: "none", color: "blue" }} href="https://www.linkedin.com/in/uday-sachdeva-486651162/">LinkedIn</a></Typography>
                            <Typography className={classes.textBody} variant="h6"><a style={{ textDecoration: "none", color: "blue" }} href="https://github.com/usaches">Github</a></Typography>
                            <Typography className={classes.textBody} variant="h6"><a style={{ textDecoration: "none", color: "blue" }} href="mailto:usaches@gmail.com">Email</a></Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <div className={classes.imagePosition}>
                            <img className={classes.card} src={Stephan} />
                        </div>
                        <div className={classes.paper}>
                            <Typography className={classes.text} variant="h4">Stephan Allen</Typography>
                            <Typography className={classes.textBody} variant="h6"><a style={{ textDecoration: "none", color: "blue" }} href="https://www.linkedin.com/in/stephan-allen-a5449529/">LinkedIn</a></Typography>
                            <Typography className={classes.textBody} variant="h6"><a style={{ textDecoration: "none", color: "blue" }} href="https://github.com/sallen2">Github</a></Typography>
                            <Typography className={classes.textBody} variant="h6"><a style={{ textDecoration: "none", color: "blue" }} href="mailto:sallen202009@gmail.com">Email</a></Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <div className={classes.imagePosition}>
                        <img className={classes.card} src={Jeremy} />
                        </div>
                        <div className={classes.paper}>
                            <Typography className={classes.text} variant="h4">Jeremy Swain</Typography>
                            <Typography className={classes.textBody} variant="h6"><a style={{ textDecoration: "none", color: "blue" }} href="https://www.linkedin.com/in/jeremy-swain-20148a168/">LinkedIn</a></Typography>
                            <Typography className={classes.textBody} variant="h6"><a style={{ textDecoration: "none", color: "blue" }} href="https://github.com/Jatlanta3000">Github</a></Typography>
                            <Typography className={classes.textBody} variant="h6"><a style={{ textDecoration: "none", color: "blue" }} href="mailto:jatlanta3000@gmail.com">Email</a></Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

TheTeam.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TheTeam);