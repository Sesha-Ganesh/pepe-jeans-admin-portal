import './App.css';
import { useState, useEffect } from 'react';
import Form from './Form';
import Dashboard from './Dashboard';

function App() {
   const [dresses, setDresses] = useState([]);
   const [updateDress, setUpdateDress] = useState({});
   const [isDataProcessed, setIsDataProcessed] = useState(false);

   useEffect(() => {
      fetch('/getdresses')
         .then((res) => res.json())
         .then((data) => {
            // console.log(data['data']);
            setDresses(data['data']);
         });
   }, [isDataProcessed]);

   return (
      <>
         <center><h1>Admin Dashboard</h1></center>
         <div className='App'>
            <Dashboard
               dresses={dresses}
               setUpdateDress={setUpdateDress}
               updateDress={updateDress}
               setIsDataProcessed={setIsDataProcessed}
            />
            <Form
               updateDress={updateDress}
               setUpdateDress={setUpdateDress}
               setIsDataProcessed={setIsDataProcessed}
            />
         </div>
      </>
   );
}

export default App;
