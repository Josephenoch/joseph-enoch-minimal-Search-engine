import logo from './logo.svg';
import './App.css';
import SearchBar from './Components/SearchBar';
import { useState } from 'react';

function App() {
  const [found, setFound] = useState(null)
  const hi = ["1","2"]
  const a = {
       user: {
         id: 1,
         name: {
           firstName: "James",
           lastName: "Ibori"
         },
         location: {
           city: "Ikoyi",
           state: "Lagos",
           address: "One expensive house like that"
         }
       }
      }
  return (
    <div className="App bg-gray-400 pt-10 flex-col flex items-center h-screen">
      <SearchBar items={a} setFound={setFound}/>
      {found?"found":"Not Found"}
    </div>
  );
}

export default App;
