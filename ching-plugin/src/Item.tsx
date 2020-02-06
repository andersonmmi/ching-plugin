import React from 'react';

function Item(props: any) {
  const qty = props.qty;
  const item = props.item;
  const price = props.price;

  return (
    <div className='Item'>
      {qty} {item} @ {parseFloat(price.toFixed(2))}
    </div>
  );
}

export default Item;
