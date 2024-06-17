import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    useTheme
} from "@mui/material";
import Header from "../Includes/Header.jsx";
import axios from "axios";
import { tokens } from "../../Theme.js";
import MovieItems from "./MovieItems.jsx";
import {getAllMovies} from "../../Api/ApiHelper.jsx";
import { Link } from "react-router-dom";

const API_URL = 'https://api.themoviedb.org/3/discover/movie';
const API_KEY = '064f5652543e03d2c5b9e4298f7a7c8d';

const GetMovies = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getAllMovies()
            .then((data) => setMovies(data.movies))
            .catch((err) => console.log(err));

    }, []);
    console.log(movies);

    return (
        <Box m="10px">
            <Header title="MOVIES" subtitle="Book and Enjoy" />
            <Box display="flex" justifyContent="center" marginTop={2}>
                {
                    movies && movies.slice(0, 4).map((item, index) =>
                        <MovieItems id={item.id} key={index}
                            desctiption={item.desctiption}
                            posterUrl={item.posterUrl}
                            genre={item.genre}
                            showTime={item.showTime}
                            releaseDate={item.releaseDate} />
                    )
                }
            </Box>
            <Box >
                <Button LinkComponent={Link} to="/movie" sx={{ backgroundColor: colors.grey[500] }} variant="contained"> View all Movies</Button>
            </Box>
        </Box>
    )
}

export default GetMovies;
