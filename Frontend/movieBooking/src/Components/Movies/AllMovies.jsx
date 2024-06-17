import React, { useEffect, useState } from "react";
import Header from "../Includes/Header";
import {
    Box,
    useTheme,
    Typography,
} from "@mui/material";
import { tokens } from "../../Theme.js";
import {getAllMovies} from "../../Api/ApiHelper.jsx";
import MovieItems from "./MovieItems.jsx";
const AllMovies = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [movies, setMovies] = useState();
    useEffect(() => {
        getAllMovies()
            .then((data) => setMovies(data.movies))
            .catch((err) => console.log(err));

    }, []);
    console.log(movies);
    return (
        <Box sx={{ ml: "10px" }}>
            <Header title="All Movies" subtitle="Watch and Enjoy" />
            <Box display="flex" justifyContent="center" textAlign="center" marginTop={2}>
                <Typography variant="h4" color={colors.grey[100]} bgcolor={colors.grey[900]} width="40%">All Movies</Typography>
            </Box>
            <Box width="100%" flexWrap="wrap">
                {
                    movies && movies.map((movie, index) => <MovieItems
                        id={movie.id} key={index}
                        desctiption={movie.desctiption}
                        posterUrl={movie.posterUrl}
                        genre={movie.genre}
                        showTime={movie.showTime}
                        releaseDate={movie.releaseDate} />)
                }
            </Box>
        </Box>
    )
}

export default AllMovies;