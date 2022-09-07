import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const Part1 = () => {
    const [data, setData] = useState([]);
    const [charactersIdArray , setCharactersIdArray] = useState([]);
    const [charactersCount, setCharactersCount] = useState(0);
    const [charactersData, setCharactersData] = useState({});
    const [characterObject, setCharacterObject] = useState({});
    let count = 0;

    /// Getting all the charaters with origin Earth (C-137). - their id is saved in the data array.
    useEffect(() => {
        axios
        .get('https://rickandmortyapi.com/api/location/?name=Earth (C-137)')
        .then((response) => setData(response.data.results[0].residents));
    },[]);
    
    /// Saving only the Id of the characters in an array and having param for the length of the array.
    useEffect(() => {
        setCharactersIdArray(data.map((character) =>  character.slice(42)));
        setCharactersCount(charactersIdArray.length);
    },[data])
    
    useEffect(() => {
        if(charactersCount > 1){
            while(count < charactersCount){
                axios
                .get(`https://rickandmortyapi.com/api/character/${charactersIdArray[count]}`)
                .then((response) => setCharacterObject(response.data));
                setCharactersData({ "name": characterObject.name, "numOfEpisodes": characterObject.episode.length});
                count++
            }
        }
    },[charactersCount]);

    return (
        <div>
            <h1>The Most unpopular character from Earth 1C-137</h1>
            <p>Character name {charactersData.name}</p>
            <p>Origin name {data.location}</p>
            <p>Origin dimension {}</p>
            <p>Poplurity {charactersData.length}</p>

        </div>
    )
};

export default Part1;
