import axios from "axios";

export const getToken = async() =>{
    const res = await axios.post("https://accounts.spotify.com/api/token",{
        grant_type:"client_credentials",
        client_id:import.meta.env.VITE_REACT_APP_SP_CLIENT_ID,
        client_secret:import.meta.env.VITE_REACT_APP_SP_CLIENT_SECRET
    },{
        headers:{"Content-Type": "application/x-www-form-urlencoded"}
    });
    // console.log(res.data.access_token)
    return res.data.access_token;
}

export const getPopularSongs = async() =>{

    const token = await getToken();
    
    const popularSongs = await axios.get("https://api.spotify.com/v1/playlists/37i9dQZF1DX9vYRBO9gjDe/tracks",{
            headers:{Authorization: "Bearer " + token}
        });

    // console.log(popularSongs);
    return popularSongs;
}


export const searchSongs = async(keyword:string,limit:Number,offset:Number) =>{

    const token = await getToken();
    
    const searchResults = await axios.get("https://api.spotify.com/v1/search",{
            headers:{Authorization: "Bearer " + token},
            params:{q:keyword,type:"track",limit,offset}
        });

    // console.log(searchResults);
    return searchResults.data.tracks;
}

