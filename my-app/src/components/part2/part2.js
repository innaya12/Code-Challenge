import React from 'react';


const Chart = ( {children, height, width} ) => (  
    <svg viewBox={`0 0 ${width} ${height}`} height={height} width={width}>
        {children}
    </svg> 
);

const Bar = ({ x, y, height, width }) => (
    <rect x={x} y={y} height={height} width={width} />
);
    
const Part2 = ({data}) => {
    const barWidth = 20
    const barMargin = 5
    const width = data.length * (barWidth + barMargin)
    const height =  20

    return (
        <div>
            <h1>Popularity bar chart</h1>
                <Chart height={height} width={width}>
                    {data.map((data,index)=> 
                    ( <Bar key={data.name}
                        x={index * (barWidth + barMargin)}
                        y={height - data.popularity}
                        width={barWidth}
                        height={data.popularity} />
                        )
                    )}
                </Chart>
        </div>
    )
};

export default Part2;

