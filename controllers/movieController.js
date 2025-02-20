import Movie from '../models/movieModel.js';
import fs from 'fs';
import path from 'path';

export const addMovie = async (req, res) => {
    try {
        const { title, rating, releaseDate, genre, director, producer, trailerUrl, description, year, cast } = req.body;

        // Handle poster
        const poster = req.files['poster'] ? req.files['poster'][0].filename : null;

        // Handle cast images
        let castArray = JSON.parse(cast);
        if (req.files['castImages']) {
            req.files['castImages'].forEach((file, index) => {
                castArray[index].image = file.filename;
            });
        }

        // Create and save new movie
        const movie = new Movie({
            title,
            rating,
            releaseDate,
            genre,
            director,
            producer,
            poster,
            trailerUrl,
            description,
            year,
            cast: castArray
        });

        await movie.save();
        res.status(201).json({ message: 'Movie added successfully!', movie });

    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json(movie);
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        const { title, rating, releaseDate, genre, director, producer, trailerUrl, description, year, cast } = req.body;

        // Handle poster update
        if (req.files['poster']) {
            movie.poster = req.files['poster'][0].filename;
        }

        // Handle cast update
        let castArray = JSON.parse(cast);
        if (req.files['castImages']) {
            req.files['castImages'].forEach((file, index) => {
                castArray[index].image = file.filename;
            });
        }

        // Update movie details
        movie.title = title;
        movie.rating = rating;
        movie.releaseDate = releaseDate;
        movie.genre = genre;
        movie.director = director;
        movie.producer = producer;
        movie.trailerUrl = trailerUrl;
        movie.description = description;
        movie.year = year;
        movie.cast = castArray;

        await movie.save();
        res.status(200).json({ message: 'Movie updated successfully!', movie });

    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        await movie.deleteOne();
        res.status(200).json({ message: 'Movie deleted successfully!' });

    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
