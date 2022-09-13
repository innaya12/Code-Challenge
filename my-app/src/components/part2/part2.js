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
    const height =  100
    let result = [];
    let runOnlyOnce = 1; 

    useEffect(() => {
    console.log(' useeffect ');
    if(runOnlyOnce === 1){
        runOnlyOnce++
            for (let i = 0; i < urlNames.length; i++) {
                axios
                .get(`https://rickandmortyapi.com/api/character/?name=${urlNames[i]}`)            
                .then((response) => {
                    console.log('result1', result)
                    result.push({'name': response.data.results[0].name, 'popularity': response.data.results[0].episode.length });
                    setData([...result]); 
                })
            }
        }
    }, []);
       
    return (
        <div>
            <h1>Popularity bar chart</h1>
            <Chart height={height} width={width}>
                {data.map((data,index)=> {
                    return (
                        <Bar key={data.name}
                        x={index * (barWidth + barMargin)}
                        y={height - data.popularity}
                        width={barWidth}
                        height={data.popularity} />
                        )
                    })}
            </Chart>
        </div>
    )
};

export default Part2;

