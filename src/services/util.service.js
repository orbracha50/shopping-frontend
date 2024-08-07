import axios from "axios"

export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


export function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

export function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

export function formatDate(timestamp) {
    const date = new Date(timestamp)
    const options = {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    }
    return date.toLocaleDateString('en-US', options)
}

export function formatDuration(duration) {
    if (!duration) return '00:00'
    const minutes = Math.floor(duration / 60000)
    const seconds = Math.floor((duration % 60000) / 1000)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export function formatTime(time) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}


export function formatPlaylistDuration(totalMilliseconds) {
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        return `${hours} hr ${minutes} min`;
    } else {
        return `${minutes} min ${seconds} sec`;
    }
}
export async function getLyrics(song) {
    try {
        const songName = song.title
        const songArtist = song.artists[0].name
        const apiKey = '23d3edbb3a69083e3091c32a9bab7295'

        // CORS proxy URL
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const apiUrl = `https://api.musixmatch.com/ws/1.1/track.search?q_track=${encodeURIComponent(songName)}&q_artist=${encodeURIComponent(songArtist)}&page_size=1&apikey=${apiKey}`;

        // Make the request through the proxy
        const response = await axios.get(proxyUrl + encodeURIComponent(apiUrl));


        const track = response.data.message.body.track_list[0]?.track;
        if (!track) {
            throw new Error('No results found');
        }
        console.log('track id:', track.track_id)
        const lyricsResponse = await axios.get(proxyUrl + encodeURIComponent(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${apiKey}&track_id=${track.track_id}`));
        const lyrics = lyricsResponse.data.message.body.lyrics.lyrics_body;
        console.log(lyricsResponse)
        return lyrics
    } catch (err) {
        console.log(err)
    }
};
