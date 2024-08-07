import { storageService } from '../async-storage.service'
import { httpService } from '../http.service'

const SPOTIFY_CACHE = 'spDB'
export const productService = {
    queryProducts,
    getById,
    save,
    remove,
    queryAlbums,
    getTracks,
    getAlbumById
}

async function queryProducts() {
    return await httpService.get(`product`)
}
async function queryAlbums() {

    return await httpService.get(`album`)
}
async function getById(productId) {
    return await httpService.get(`product/${productId}`)
}

async function getAlbumById(productId) {
    return await httpService.get(`album/${productId}`)
}

async function remove(productId) {
    return await httpService.delete(`product/${productId}`)
}
async function getTracks(searchVal) {
    if (!searchVal) {
        return
    }
    if (gSongsCache[searchVal]) {
        return Promise.resolve(gSongsCache[searchVal])
    }
    const tracks = await spotifyService.searchTracks(searchVal);
    console.log(tracks)
    const songs = await Promise.all(tracks.map(track => {
        return {
            imgUrl: track.album.images[0].url,
            artists: track.artists,
            duration: track.duration_ms,
            title: track.name,
            _id: makeId(),
            albumName: track.album.name,
            releaseDate: track.album.release_date,
            albumId: track.album.id
        }
    }))
    gSongsCache[searchVal] = songs
    saveToStorage(SPOTIFY_CACHE, gSongsCache)
    storageService.post(SPOTIFY_CACHE, songs);
    return songs
}
async function save(product) {
    var savedProduct
    if (product._id) {
        savedProduct = await httpService.put(`product/${product._id}`, product)
    } else {
        savedProduct = await httpService.post('product', product)
    }
    return savedProduct
}
