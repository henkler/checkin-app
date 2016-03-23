import React from 'react';
import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Toggle from 'material-ui/lib/toggle';
import Avatar from 'material-ui/lib/avatar';
import FloatingActionButton from 'material-ui/lib/floating-action-button';

const style = {
    width: 300,
    margin: 10,
    textAlign: 'center',
    display: 'inline-block',
};

export const Business = (props) => (
    <Paper style={style} zDepth={4}>
        <Card>
            <CardHeader
                title={<h3>{`${props.checkinCount} Going Tonight`}</h3>}
            />
            <CardMedia
                overlay={<CardTitle title={props.name} />}
            >
                <img src={props.image_url} />
            </CardMedia>
            <CardText>
                <Avatar src={props.snippet_image_url} />
                <img src={props.rating_img_url} />
                <p>{props.snippet_text}</p>
                <FlatButton
                    label="View Yelp Page"
                    secondary={true}
                    onClick={() => window.open(props.url, '_blank')}
                />
            </CardText>
            <CardActions>
                <Toggle
                    label="I'm Going Tonight"
                    labelPosition="right"
                    toggled={props.isGoing}
                    onToggle={(event, isInputChecked) => props.doCheckin(props.id, isInputChecked)}
                />
            </CardActions>
        </Card>
    </Paper>
);
