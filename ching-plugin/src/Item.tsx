import React from 'react';

function Item(props) {
  const qty = props.qty;
  const item = props.item;
  const price = props.price;

  return (
    <div className='Item'>
      {qty} {item} @ {price}
    </div>
  );
}

export default Item;