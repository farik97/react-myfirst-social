import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography, Link } from '@material-ui/core';

const styles = {
    cards: {
        display: 'flex'
    }
}

class Post extends Component {
    render() {
        const {classes, post: {body, createdAt, userImage, userHandle, postId, likeCount, commentCount}} = this.props 
        return (
            <Card>
                <CardMedia image={userImage} title="Profile Image" />
                <CardContent>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{createdAt}</Typography>
                    <Typography variant="body1" >{body}</Typography>
                </CardContent>
            </Card> 
        )
    }
}

export default withStyles(styles)(Post)
