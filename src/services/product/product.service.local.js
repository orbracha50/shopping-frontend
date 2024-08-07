


const PRODUCTS_KEY = 'products'
const ALBUMS_KEY = 'albums'
const LIKED_SONGS = 'likedsongs'
const ARTISTS_KEY = 'artist'



export const productService = {
  query,
  getById,
  remove,
  save,
  addToLikedSongs,
  queryAlbums,
  getTracks
}
window.cs = productService

async function query() {
  console.log('hi')
  var products = await storageService.query(PRODUCTS_KEY)
  return products
}
async function queryAlbums() {
  var albums = await storageService.query('albums')
  return albums
}
function getById(productId) {
  return storageService.get(PRODUCTS_KEY, productId)
}

async function remove(productId) {
  await storageService.remove(PRODUCTS_KEY, productId)
}
async function save(product) {
  var savedProduct
  if (product._id) {
    savedProduct = await storageService.put(PRODUCTS_KEY, product)
  } else {
    savedProduct = await storageService.post(PRODUCTS_KEY, product)
  }
  return savedProduct
}

async function addToLikedSongs(likedSongs) {
  await storageService.post(LIKED_SONGS, likedSongs)
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
      artists: [track.artists[0].name],
      duration: track.duration_ms,
      title: track.name,
      _id: makeId(),
      albumName: track.album.name,
      releaseDate: track.album.release_date
    }
  }))
  gSongsCache[searchVal] = songs
  saveToStorage(SPOTIFY_CACHE, gSongsCache)
  storageService.post(SPOTIFY_CACHE, songs);
  return songs
}
async function _createSpotifyProducts() {
  let products = loadFromStorage(PRODUCTS_KEY);
  let albums = loadFromStorage(ALBUMS_KEY);
  let artists = loadFromStorage(ARTISTS_KEY);
  const artistSet = new Set();

  if (!products || !products.length) {
    products = [];
    albums = [];
    artists = []
    const playlists = await spotifyService.getPlaylists();

    const productPromises = Object.entries(playlists).map(async ([category, categoryPlaylists]) => {
      const categoryProductPromises = categoryPlaylists.map(async playlist => {
        const tracks = await spotifyService.getTracks(playlist.id);
        const songs = await Promise.all(tracks.map(async track => {
          if (track) {
            track.artists.forEach(artist => artistSet.add(artist.id));
            console.log(track)
            return {
              _id: track.id,
              title: track.name,
              duration: track.duration_ms,
              isExplicit: track.explicit,
              artists: track.artists,
              imgUrl: track.album.images[0].url,
              albumName: track.album.name,
              albumId: track.album.id,
              addedAt: new Date(track.album.release_date).getTime()
            };
          }
        }));

        return {
          name: playlist.name,
          description: playlist.description,
          imgUrl: playlist.images[0].url,
          songs: songs,
          createdBy: {
            _id: playlist.owner.id,
            fullname: playlist.owner.display_name,
            imgUrl: playlist.images[0].url,
          },
          category: category // Add the category to each product object
        };
      });

      return Promise.all(categoryProductPromises);
    });

    products = (await Promise.all(productPromises)).flat();

    const product = {
      "name": "Or's Playlist",
      "tags": [
        "Funk",
        "Happy",
        "Rap",
        "Pop"
      ],
      "createdBy": {
        "_id": "66a576defc89266ca748b323",
        "fullname": "Mustafa Adminsky",
        "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      },
      "likedByUsers": [
        "{minimal-user}",
        "{minimal-user}"
      ],
      "imgUrl": "https://i.scdn.co/image/ab67616d00001e0215ebbedaacef61af244262a8",
      "songs": [
        {
          "_id": "dQw4w9WgXcQ",
          "title": "Rick Astley - Never Gonna Give You Up",
          "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          "imgUrl": "https://i.scdn.co/image/ab67616d00001e0215ebbedaacef61af244262a8",
          "addedBy": "{minimal-user}",
          "likedBy": [
            "{minimal-user}"
          ],
          "addedAt": 162521765262,
          "duration": 212000,
          "artists": [
            {
              "id": "7lwdlhwSxbB36wqnOwo5Kd",
              "name": "Rick Astley",
              "type": "artist"
            }
          ],
          "albumName": "Album"
        },
        {
          "_id": "_4gUVl5pjps",
          "title": "21 Savage - ball w/o you",
          "url": "https://www.youtube.com/watch?v=_4gUVl5pjps",
          "imgUrl": "https://i.ytimg.com/vi/_4gUVl5pjps/mqdefault.jpg",
          "addedBy": {},
          "duration": 193000,
          "artists": [
            {
              "id": "uhughyfyvviiyviyviy",
              "name": "21 Savage",
              "type": "artist"
            }
          ],
          "albumName": "Album"
        },
        {
          "_id": "6xBpb9zNWlRHTslOAe6kXF",
          "title": "Slide da Treme Melódica v2",
          "duration": 165107,
          "isExplicit": false,
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/7nM7RtPXQ6jwNlFTfPyZnA"
              },
              "href": "https://api.spotify.com/v1/artists/7nM7RtPXQ6jwNlFTfPyZnA",
              "id": "7nM7RtPXQ6jwNlFTfPyZnA",
              "name": "DJ FNK",
              "type": "artist",
              "uri": "spotify:artist:7nM7RtPXQ6jwNlFTfPyZnA"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4DWPOsGWbW7sBHb1UuBvWs"
              },
              "href": "https://api.spotify.com/v1/artists/4DWPOsGWbW7sBHb1UuBvWs",
              "id": "4DWPOsGWbW7sBHb1UuBvWs",
              "name": "Polaris",
              "type": "artist",
              "uri": "spotify:artist:4DWPOsGWbW7sBHb1UuBvWs"
            }
          ],
          "imgUrl": "https://i.scdn.co/image/ab67616d0000b2735561f19683ceb890174747fb",
          "albumName": "Slide da Treme Melódica v2",
          "addedAt": 1715904000000
        },
        {
          "_id": "_4gUVl5pjps",
          "title": "21 Savage - ball w/o you",
          "url": "https://www.youtube.com/watch?v=_4gUVl5pjps",
          "imgUrl": "https://i.ytimg.com/vi/_4gUVl5pjps/mqdefault.jpg",
          "addedAt": 162521765264,
          "duration": 193000,
          "artists": [
            {
              "id": "7lwdlhwSxbB36wqnOwo5Kd",
              "name": "21 Savage",
              "type": "artist"
            }
          ],
          "albumName": "Album"
        }
      ],
      "description": null,
      "title": null
    }
    const product2 = {
      "name": "Ami's Playlist",
      "tags": [
        "Funk",
        "Happy"
      ],
      "createdBy": {
        "_id": "66a576defc89266ca748b323",
        "fullname": "Mustafa Adminsky",
        "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      },
      "likedByUsers": [
        {
          "_id": "66a576defc89266ca748b323",
          "fullname": "Mustafa Adminsky"
        },
        {
          "_id": "66a68cceabbba75ff02d0c33",
          "fullname": "Michael Spiridonov"
        }
      ],
      "imgUrl": "https://i.scdn.co/image/ab67616d00001e0215ebbedaacef61af244262a8",
      "songs": [
        {
          "_id": "dQw4w9WgXcQ",
          "title": "Rick Astley - Never Gonna Give You Up",
          "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          "imgUrl": "https://i.scdn.co/image/ab67616d00001e0215ebbedaacef61af244262a8",
          "likedBy": [
            "{minimal-user}"
          ],
          "addedAt": 162521765262,
          "duration": 212000,
          "artists": [
            {
              "id": "7lwdlhwSxbB36wqnOwo5Kd",
              "name": "Rick Astley",
              "type": "artist"
            }
          ],
          "albumName": "Album"
        },
        {
          "_id": "_4gUVl5pjps",
          "title": "21 Savage - ball w/o you",
          "url": "https://www.youtube.com/watch?v=_4gUVl5pjps",
          "imgUrl": "https://i.ytimg.com/vi/_4gUVl5pjps/mqdefault.jpg",
          "addedAt": 162521765264,
          "duration": 193000,
          "artists": [
            {
              "id": "7lwdlhwSxbB36wqnOwo5Kd",
              "name": "21 Savage",
              "type": "artist"
            }
          ],
          "albumName": "Album"
        },
        {
          "_id": "6xBpb9zNWlRHTslOAe6kXF",
          "title": "Slide da Treme Melódica v2",
          "duration": 165107,
          "isExplicit": false,
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/7nM7RtPXQ6jwNlFTfPyZnA"
              },
              "href": "https://api.spotify.com/v1/artists/7nM7RtPXQ6jwNlFTfPyZnA",
              "id": "7nM7RtPXQ6jwNlFTfPyZnA",
              "name": "DJ FNK",
              "type": "artist",
              "uri": "spotify:artist:7nM7RtPXQ6jwNlFTfPyZnA"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4DWPOsGWbW7sBHb1UuBvWs"
              },
              "href": "https://api.spotify.com/v1/artists/4DWPOsGWbW7sBHb1UuBvWs",
              "id": "4DWPOsGWbW7sBHb1UuBvWs",
              "name": "Polaris",
              "type": "artist",
              "uri": "spotify:artist:4DWPOsGWbW7sBHb1UuBvWs"
            }
          ],
          "imgUrl": "https://i.scdn.co/image/ab67616d0000b2735561f19683ceb890174747fb",
          "albumName": "Slide da Treme Melódica v2",
          "addedAt": 1715904000000
        }
      ],
      "description": null,
      "title": null
    }
    const product3 = {
      "name": "Michael's Playlist",
      "tags": [
        "Funk",
        "Happy"
      ],
      "createdBy": {
        "_id": "66a68cceabbba75ff02d0c33",
        "fullname": "Michael Spiridonov",
        "imgUrl": "https://i.scdn.co/image/ab67616d00001e027459992b444de38842b9bee7"
      },
      "imgUrl": "https://i.scdn.co/image/ab67616d00001e027459992b444de38842b9bee7",
      "likedByUsers": [
        {
          "_id": "66a68cceabbba75ff02d0c33",
          "fullname": "Michael Spiridonov"
        }
      ],
      "songs": [
        {
          "_id": "Trv80iyv8qs",
          "title": "Juice WRLD - High and Alone ",
          "url": "https://www.youtube.com/watch?v=Trv80iyv8qs",
          "imgUrl": "https://i.ytimg.com/vi/Trv80iyv8qs/mqdefault.jpg",
          "likedBy": [
            "{minimal-user}"
          ],
          "addedAt": 162521765264,
          "duration": 193000,
          "artists": [
            {
              "id": "7lwdlhwSxbB36wqnOwo5Kd",
              "name": "Juice Wrld",
              "type": "artist"
            }
          ],
          "albumName": "Album"
        },
        {
          "_id": "iT6MEoRywDY",
          "title": "Juice WRLD - Rockstar In His Prime",
          "url": "https://www.youtube.com/watch?v=iT6MEoRywDY",
          "imgUrl": "https://i.ytimg.com/vi/iT6MEoRywDY/mqdefault.jpg",
          "likedBy": [
            {
              "_id": "66a68cceabbba75ff02d0c33",
              "fullname": "Michael Spiridonov"
            }
          ],
          "addedAt": 162521765266,
          "duration": 220000,
          "artists": [
            {
              "id": "7lwdlhwSxbB36wqnOwo5Kd",
              "name": "Juice Wrld",
              "type": "artist"
            }
          ],
          "albumName": "Album"
        },
        {
          "_id": "Sis_JJZoAfQ",
          "title": "Juice WRLD - Cigarettes",
          "url": "https://www.youtube.com/watch?v=Sis_JJZoAfQ",
          "imgUrl": "https://i.ytimg.com/vi/Sis_JJZoAfQ/mqdefault.jpg",
          "likedBy": [
            {
              "_id": "66a68cceabbba75ff02d0c33",
              "fullname": "Michael Spiridonov"
            }
          ],
          "addedAt": 162521765266,
          "duration": 220000,
          "artists": [
            {
              "id": "7lwdlhwSxbB36wqnOwo5Kd",
              "name": "Juice Wrld",
              "type": "artist"
            }
          ],
          "albumName": "Album"
        },
        {
          "_id": "A4pasf5ci8s",
          "title": "Juice WRLD - Purple Potion",
          "url": "https://www.youtube.com/watch?v=A4pasf5ci8s",
          "imgUrl": "https://i.ytimg.com/vi/A4pasf5ci8s/mqdefault.jpg",
          "likedBy": [
            {
              "_id": "66a68cceabbba75ff02d0c33",
              "fullname": "Michael Spiridonov"
            }
          ],
          "addedAt": 162521765262,
          "duration": 212000,
          "artists": [
            {
              "id": "7lwdlhwSxbB36wqnOwo5Kd",
              "name": "Juice Wrld",
              "type": "artist"
            }
          ],
          "albumName": "Album"
        }
      ],
      "description": null,
      "title": null
    }
    products.push(product)
    products.push(product2)
    products.push(product3)
  }

  if (!albums || !albums.length) {
    const albumSongs = await spotifyService.getAlbums()
    const albumPromises = Object.entries(albumSongs).map(async ([category, categoryPlaylists]) => {
      const categoryAlbumPromises = categoryPlaylists.map(async album => {
        const tracks = await spotifyService.getAlbumTracks(album.id);
        const songs = await Promise.all(tracks.map(async track => {
          return {
            title: track.name,
            duration: track.duration_ms,
            isExplicit: track.explicit,
            artists: track.artists,
          };
        }));

        return {
          _id: album.id,
          name: album.name,
          imgUrl: album.images[2].url,
          songs: songs,
          releaseDate: album.release_date,
          category: category
        };
      })
      return Promise.all(categoryAlbumPromises);
    })

    albums = await Promise.all(albumPromises);
  }

  // if(!artists || !artists.length) {
  //   const uniqueArtistIds = Array.from(artistSet);
  //   artists = await spotifyService.getArtists(uniqueArtistIds);

  //   const artistAlbumPromises = uniqueArtistIds.map(async artistId => {
  //     const artistAlbums = await spotifyService.getArtistAlbums(artistId);

  //     const albumDetailsPromises = artistAlbums.map(async album => {
  //       const tracks = await spotifyService.getAlbumTracks(album.id);
  //       const songs = await Promise.all(tracks.map(track => {
  //         return {
  //           _id: track.id,
  //           title: track.name,
  //           duration: track.duration_ms,
  //           isExplicit: track.explicit,
  //           artists: track.artists,
  //           imgUrl: track.album.images[0]?.url,
  //           albumName: track.album.name,
  //           addedAt: new Date(track.album.release_date).getTime()
  //         };
  //       }));

  //       return {
  //         _id: album.id,
  //         name: album.name,
  //         imgUrl: album.images[0]?.url,
  //         songs: songs,
  //         releaseDate: album.release_date
  //       };
  //     });

  //     const artistAlbumsWithTracks = await Promise.all(albumDetailsPromises);

  //     return {
  //       _id: artistId,
  //       albums: artistAlbumsWithTracks
  //     };
  //   });

  //   const artistAlbums = await Promise.all(artistAlbumPromises);
  //   artists = artists.map(artist => {
  //     const artistAlbumData = artistAlbums.find(a => a._id === artist.id);
  //     return {
  //       ...artist,
  //       albums: artistAlbumData ? artistAlbumData.albums : []
  //     };
  //   });
  // }

  if (!localStorage.getItem(PRODUCTS_KEY)) {
    saveToStorage(PRODUCTS_KEY, products);
    saveToStorage(ALBUMS_KEY, albums);
    //saveToStorage(ARTISTS_KEY, artists);
  }
} 