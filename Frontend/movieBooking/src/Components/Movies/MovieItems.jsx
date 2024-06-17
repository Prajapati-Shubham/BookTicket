import {
    Box,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    Button,
    useTheme
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { tokens } from "../../Theme.js";

const MovieItems = (title, releaseDate, posterUrl, id, desctiption, genre, showTime) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box sx={{ ml: "10px" }}>
            <Card sx={{ display: 'flex', maxWidth: 400, backgroundColor: colors.grey[500] }}>
                <Grid container >
                    <Grid item xs={12} sm={6}>
                        <CardMedia
                            component="img"
                            height="100%"
                            image={posterUrl}
                            sx={{ objectFit: 'cover' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CardContent >
                            <Typography variant="h6" component="p" gutterBottom>
                                <b>{title}</b>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {desctiption}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {genre}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {new Date(releaseDate).toDateString}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {showTime}
                            </Typography>
                        </CardContent>
                        <Button sx={{ m: 5, backgroundColor: colors.grey[500] }} variant="contained">Book Ticket</Button>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    )
}

export default MovieItems;