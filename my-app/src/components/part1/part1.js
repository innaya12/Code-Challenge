import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Part1 = () => {
    const [result, setResult] = useState(null);
    const [charactersIdArray, setCharactersIdArray] = useState([]);
    
    /// Getting all the charaters with origin Earth (C-137). - their id is saved in the data array.
    useEffect(() => {
        axios
        .get('https://rickandmortyapi.com/api/location/?name=Earth (C-137)')
        .then((response) => setCharactersIdArray(response.data.results[0].residents.map((character) =>  character.slice(42))))
    }, []);
    
    /// Getting the number of episode of all the character in one api call with their ids.
    useEffect(() => {
        let mostUnpopularCharacter;
        if(charactersIdArray.length > 0){
            axios
            .get(`https://rickandmortyapi.com/api/character/${charactersIdArray.join(',')}`)            
            .then((response) => {
                mostUnpopularCharacter = { numOfEpisodes: 0, characters: [] };
                
                for (let i = 0; i < response.data.length - 1; i++) {
                    const character = response.data[i];
                    const numOfEpisodes = character.episode.length;
                    
                    // if it's the first iteration
                    if (!mostUnpopularCharacter.numOfEpisodes) {
                        mostUnpopularCharacter.numOfEpisodes = numOfEpisodes;
                        mostUnpopularCharacter.characters.push(character) 
                    }
                    // if the character appears in less eposides - replace the current character list
                    else if (mostUnpopularCharacter.numOfEpisodes > numOfEpisodes) {
                        mostUnpopularCharacter = { numOfEpisodes, characters: [character] }
                    }
                    // if the character appears in the same amount of eposides - add character to character list
                    else if (mostUnpopularCharacter.numOfEpisodes === numOfEpisodes) {
                        mostUnpopularCharacter.characters.push(character)
                    }               
                }
                setResult(mostUnpopularCharacter);
            });
        }
    },[charactersIdArray]);


    return (
    <div>
        <h1>The Most unpopular character from Earth C-137</h1>
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
                <tr key={character.id}>
                    <td>{character.name}</td>
                    <td>{character.location.name}</td>
                    <td>{character.origin.name}</td>
                    <td>{result.numOfEpisodes}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
};

export default Part1;

