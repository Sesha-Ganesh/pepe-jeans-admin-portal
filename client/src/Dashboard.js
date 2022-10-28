import React from 'react';

const Dashboard = ({ dresses, updateDress, setUpdateDress, setIsDataProcessed }) => {
   const handleDelete = async (id) => {
      console.log(id);
      console.log('delete request sending...');

      let response = await fetch('/deletedress', {
         headers: { 'Content-Type': 'application/json' },
         method: 'DELETE',
         body: JSON.stringify({ _id: id }),
         mode: 'cors',
      });
      if (response.status === 200) {
         console.log('deleted successfully');
         setIsDataProcessed((prev) => !prev);
      }
   };

   return (
      <div className='listItems'>
         <h4>
            <center>List of Dresses</center>
         </h4>
         {dresses.length ? (
            dresses.map((dress, index) => {
               return (
                  <div key={dress._id} className='listItemDress'>
                     <p>Name: {dress.name}</p>
                     <img src={dress.imageURL} className='dressImage' />
                     <div>
                        <p>Price:₹ {dress.price}</p>
                        <p>Quantity: {dress.quantity}</p>
                     </div>
                     <div>
                        <p>Type: {dress.type}</p>
                        <p>Gender: {dress.gender}</p>
                        <p>Color: {dress.color}</p>
                     </div>

                     <button onClick={() => handleDelete(dress._id)}>Delete</button>
                     {Object.keys(updateDress).length ? (
                        <button disabled>Update</button>
                     ) : (
                        <button onClick={() => setUpdateDress(dress)}>Update</button>
                     )}
                  </div>
               );
            })
         ) : (
            <center>
               <h2>. . . Empty . . .</h2>
            </center>
         )}
      </div>
   );
};

export default Dashboard;
