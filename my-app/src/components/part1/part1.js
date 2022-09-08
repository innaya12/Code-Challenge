import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const Part1 = () => {
    const [data, setData] = useState([]);
    const [result, setResult] = useState(null);
    const [charactersIdArray, setCharactersIdArray] = useState([]);
    let mostUnpopularCharacter;

    /// Getting all the charaters with origin Earth (C-137). - their id is saved in the data array.
    useEffect(() => {
        axios
        .get('https://rickandmortyapi.com/api/location/?name=Earth (C-137)')
        .then((response) => setData(response.data.results[0].residents));
        setCharactersIdArray(data.map((character) =>  character.slice(42)));
    }, []);

    /// Getting the number of episode of all the character in one api call with their ids.
    useEffect(() => {
        console.log('charactersIdArray', charactersIdArray)
        axios
        .get(`https://rickandmortyapi.com/api/character/${charactersIdArray.join(',')}`)			
        .then((response) => {
            mostUnpopularCharacter = response.data.reduce((acc ,character) => {
            // console.log('response.data.', response.data);
                const numOfEpisodes = character.episode.length;
                console.log('numOfEpisodes', numOfEpisodes);

                ///if it's the first iteration
                if(!acc.numOfEpisodes){
                    acc.numOfEpisodes = numOfEpisodes;
                    acc.characters.push(character)
                }
            
                // if the character appears in less eposides - replace the current character list
                else if (acc.numOfEpisodes > numOfEpisodes) {
                    acc = { numOfEpisodes, characters: [character] }
                }

                // if the character appears in the same amount of eposides - add character to character list
                else if (acc.numOfEpisodes == numOfEpisodes) {
                    acc.characters.push(character)
                }
                return acc;
            })
            ,{ numOfEpisodes: 0, characters: [] };
            setResult(mostUnpopularCharacter);            
        });
    },[]);


    return (
    <div>
        <h1>The Most unpopular character from Earth 1C-137</h1>
        <table>
            <thead>
                <tr>
                    <th>Character name</th>
                    <th>Origin name</th>
                    <th>Origin Dimension</th>
                    <th>Popularity</th>
                </tr>
            </thead>
            <tbody>
                {(result ? result.characters : []).map((character) => (
                    <tr>
                        <td>{character.name}</td>
                        <td>{mostUnpopularCharacter.current.name}</td>
                        <td>{mostUnpopularCharacter.current.dimension}</td>
                        <td>{result.numOfEpisodes}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
};

export default Part1;
