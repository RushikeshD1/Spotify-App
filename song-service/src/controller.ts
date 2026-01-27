import { sql } from "./config/db.js";
import TryCatch from "./TryCatch.js";

export const getAllAlbums = TryCatch(async (req, res) => {
    let albums;

    albums = await sql`SELECT * FROM albums`;

    res.json(albums);
})

export const getAllSongs = TryCatch(async (req, res) => {
    let songs;

    songs = await sql`SELECT * FROM songs`;

    res.json(songs);
})

export const getAllSongsOfAlbums = TryCatch(async (req, res) => {
    const {id} = req.params;

    let albums, songs;

    albums = await sql`SELECT * FROM albums WHERE id = ${id}`

    if(albums.length === 0){
        res.status(404).json({
            message: "No album with this id"
        });

        return;
    }

    songs = await sql`SELECT * FROM songs WHERE album_id = ${id}`;

    const response = {songs, album:albums[0]}

    res.json(response);
})

export const getSingleSong = TryCatch(async (req, res) => {
    const song = await sql`SELECT * FROM songs WHERE id = ${req.params.id}`

    res.json(song[0]);
})