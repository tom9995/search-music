import { useEffect, useRef, useState } from 'react';
import './App.css'
import { SongList } from './components/SongList';
import { getPopularSongs, searchSongs} from './lib/SpotifyUtil';
import { Player } from './components/Player';
import {SearchInput} from './components/SearchInput';
import { Pagination } from './components/Pagination';

const limit:number = 20;

export default function App() {
  const [isLoad,setIsLoad] = useState(false);
  const [popularSongs,setPopularSongs] = useState([]);
  const [isPlay,setISPlay] = useState(false);
  const [selectedSong,setSelectedSong] = useState();
  const [keyWord,setKeyWord] = useState('');
  const [page,setPage] = useState(1);
  const [pre,setPre] = useState(false);
  const [nex,setNex] = useState(false);
  const [searchedSongs,setSearchedSongs] = useState();
  const audioRef = useRef(null);


  useEffect( ()=>{
    fetchPopularSongs();
  },[])

  const fetchPopularSongs = async() =>{
    setIsLoad(true);
    const newSongs = await getPopularSongs();
    const newTracks = newSongs.data.items.map((song:any)=>{return song.track});
    setPopularSongs(newTracks);
    setIsLoad(false);
  }

  const handleSongSelection = async(song:any) =>{
    setSelectedSong(song);
    if(song.preview_url){
      audioRef.current.src = song.preview_url;
      toggleSong();
    }
    else{
      pauseSong();
    }
  }

  const playSong = () => {
    audioRef.current.play();
    setISPlay(true);
  }

  const pauseSong = () => {
    audioRef.current.pause();
    setISPlay(false);
  }

  const toggleSong = () =>{
    if(isPlay)pauseSong();
    else playSong();
  }

  const handleInput = (e:any) =>{
    // console.log(e.target.value);
    setKeyWord(e.target.value);
  }

  const handleSearch = async(page:any) =>{
    setIsLoad(true);
    const offset:number = parseInt(page) ? (page-1)*limit :0; 
    const searchReault = await searchSongs(keyWord,limit,offset);
    // console.log(searchReault);
    // const searchedTracks = searchReault.items.map((song:any)=>{return song.track});
    setSearchedSongs(searchReault.items);
    setPre(searchReault.previous != null);
    setNex(searchReault.next != null);
    setIsLoad(false);
  }

  const goNext = async() =>{
    const next = page+1;
    await handleSearch(next);
    setPage(next);
  }

  const goPrev = async() =>{
    const prev = page-1;
    await handleSearch(prev);
    setPage(prev);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>
        <SearchInput onInput={handleInput} handleSearch={handleSearch} />
        <section>
          <h2 className="text-2xl font-semibold mb-5">{searchedSongs != null ? "Search Result" : "Popular Songs"}</h2>
        </section>
        <SongList isLoad={isLoad} songs={searchedSongs || popularSongs} onSongSelected={handleSongSelection}/>
        {searchedSongs != null && <Pagination goNext={nex ? goNext :null} goPrev={pre ? goPrev:null}/>} 
      </main>
      {selectedSong && <Player song={selectedSong} isPlay={isPlay} onButtonClick={toggleSong}/> }
      <audio ref={audioRef}></audio>
    </div>
  );
}
