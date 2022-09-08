import Part1 from './components/part1/part1';
import Part2 from './components/part2/part2';
import './App.css';

const data = [{name: "Rick Sanchez", popularity: 2},
{ name: "Summer Smith", popularity: 33},
{ name: "Morty Smith", popularity: 12}];

function App() {
  return (
    <div className="App">
      <Part1 />
      <Part2 data={data} />
    </div>
  );
}

export default App;


