import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chart = ( {children, height, width} ) => (  
    <svg viewBox={`0 0 ${width} ${height}`} height={height} width={width}>
        {children}
    </svg> 
);

const Bar = ({ x, y, height, width }) => (
    <rect x={x} y={y} height={height} width={width} />
);
    
const Part2 = () => {
    const urlNames = ["Rick%20Sanchez", "Summer%20Smith", "Morty%20Smith", "Beth%20Smith", "Jerry%20Smith"];
    const [ data, setData ] = useState([]);
    const barWidth = 20;
    const barMargin = 5
    const width = urlNames.length * (barWidth + barMargin)
    const height =  20
    let result = [];

    useEffect(() => {
        for (let i = 0; i < urlNames.length - 1; i++) {

            axios
            .get(`https://rickandmortyapi.com/api/character/?name=${urlNames[i]}`)            
            .then((response) => {                
                const name = response.data.results[0].name;
                const popularity = response.data.results[0].episode.length;
                result.push({'name': name, 'popularity': popularity });
            })
        }
        setData(result); 
    }, []);



    return (
        <div>
            <h1>Popularity bar chart</h1>
            {data.length > 1 && 
            <Chart height={height} width={width}>
                {result.map((data,index)=> 
                ( <Bar key={data.name}
                    x={index * (barWidth + barMargin)}
                    y={height - data.popularity}
                    width={barWidth}
                    height={data.popularity} />
                    )
                )}
            </Chart>
            }
        </div>
    )
};

export default Part2;

