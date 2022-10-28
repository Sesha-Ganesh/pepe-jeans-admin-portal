import React, { useState } from 'react';
import './Form.css';

const Form = ({ updateDress, setUpdateDress, setIsDataProcessed }) => {
   const [dress, setDress] = useState({});

   const handleChange = (e) => {
      e.preventDefault();
      setDress((prev) => ({ ...prev, [e.target.name]: e.target.value.toLowerCase() }));
   };

   const addData = async (e) => {
      e.preventDefault();
      // console.log('data sending to server...');
      let response = await fetch('/adddress', {
         method: 'POST',
         body: JSON.stringify(dress),
         headers: {
            'Content-Type': 'application/json',
         },
         mode: 'cors',
      });
      if (response.status === 200) {
         console.log('message posted successfully');
         setIsDataProcessed((prev) => !prev);
         setDress({});
      }
   };

   const updateData = async (e) => {
      e.preventDefault();

      let tempDress = { ...updateDress };
      for (let key in dress) {
         if (dress[key]) tempDress = { ...tempDress, [key]: dress[key] };
      }

      console.log('final dress updated');
      console.log(tempDress);

      console.log('update request sending...');
      let response = await fetch('/updatedress', {
         headers: { 'Content-Type': 'application/json' },
         method: 'PUT',
         body: JSON.stringify(tempDress),
         mode: 'cors',
      });
      if (response.status === 200) {
         console.log('updated successfully');
         setIsDataProcessed((prev) => !prev);
         setUpdateDress({});
         setDress({});
      }
   };

   return (
      <div className='form'>
         <h4>Add/Update Dress</h4>
         <p>
            Name : 
            <input type='text' onChange={handleChange} name='name' />
         </p>
         <p>
            Image URL: 
            <input type='text' onChange={handleChange} name='imageURL' />
         </p>
         <p>
            Type : 
            <input type='text' onChange={handleChange} name='type' />
         </p>
         <p>
            Price : 
            <input type='text' onChange={handleChange} name='price' />
         </p>
         <p>
            Color :
            <input type='text' onChange={handleChange} name='color' />
         </p>
         <p>
            Gender :
            <input type='text' onChange={handleChange} name='gender' />
         </p>
         <p>
            Quantity :
            <input type='text' onChange={handleChange} name='quantity' />
         </p>
         <button onClick={addData}>Add</button>
         <hr />

         {Object.keys(updateDress).length ? (
            <div>
               Item copied <button className='close-button' onClick={() => setUpdateDress({})}>x</button>
            </div>
         ) : (
            <div>Click update on desired item</div>
         )}
         <button onClick={updateData}>Update</button>
      </div>
   );
};

export default Form;
