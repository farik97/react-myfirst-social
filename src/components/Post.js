import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
    cards: {
        display: 'flex'
    }
}

class Post extends Component {
    render() {
        const {classes} = this.props 
        return (
            <Card>
                <CardContent />
            </Card> 
        )
    }
}

export default withStyles(styles)(Post)
