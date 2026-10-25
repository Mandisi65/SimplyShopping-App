import { useState } from 'react';
import inventoryData from './data/inventory.json';
import './assets/styles/App.css'

function App(){
  const [items, setItems] = useState(inventoryData);

  return (
    <div style={{padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto'}}>
      <h1>Simply Shopping Inventory</h1>
      <ul style={{display: 'felx', flexDirection: 'column', gap: '20px'}}>
        {items.map((item) => (
          <div key={item.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px', 
              border: '1px solid #ccc', 
              padding: '10px', 
              borderRadius: '8px' 
            }}>
            <img src={item.image} alt={item.name} style={{ 
              width: '80px', 
              height: '80px', 
              objectFit: 'cover', 
              borderRadius: '5px' }}/>
            <div>
              <h3 style={{margin: '0 0 5px 0'}}>{item.name}</h3>
              <p style={{color: '#666', margin: '0 0 5px 0'}}>{item.catagory}</p>
              <div style={{fontSize: '14px'}}>
                Shoprite: <strong>R {item.prices.Shoprite}</strong> | 
                Checkers: <strong>R {item.prices.Checkers}</strong> | 
                PicknPay: <strong>R {item.prices.PicknPay}</strong>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
export default App;