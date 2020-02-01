import React, { useState } from 'react';
import { PluginPageContext } from '@burner-wallet/types';
import { getTxDetails } from './ChingPlugin';
import axios from "axios";

const OrderPage: React.FC<PluginPageContext> = ({ location, BurnerComponents, actions }) => {
  const [note, setNote] = useState()
  const txDetails = getTxDetails(location.pathname);

  const { Button, Page } = BurnerComponents;

  if (!txDetails) {
    return (
      <Page title="Ching Checkout">
        Invalid order
      </Page>
    );
  }

  // just need to render some data from the endpoint
  // let itemizedList = () => {
  //   axios.get("https://us-central1-daipos.cloudfunctions.net/orderDetails?orderId=13VwSGhmVuwjpLKFmqd7")
  // }

  let soldCount, itemName;

  axios.get("https://cors-anywhere.herokuapp.com/https://us-central1-daipos.cloudfunctions.net/itemDetails?itemId=RHfVDGM5L2BKPaIwGOXA"
    // , {
    //   headers: {
    //     'Content-Type': 'text-plain',
    //     'Access-Control-Allow-Origin': '*',
    //     'crossdomain': true
    //   }
    // }
  )
  .then(response => {
    console.log(response.data.items.soldCount);
    console.log(response.data.items.name);
    soldCount = response.data.items.soldCount;
    itemName = response.data.items.name;
  });

  const continueCheckout = () => {
    actions.send({
      to: txDetails.to,
      asset: txDetails.tokenName.toLowerCase(),
      ether: txDetails.amount,
      id: txDetails.orderId,
      message: `You shared "${note}" with the message board and you ordered: ${itemizedList}`
    });
  };

  return (
    <Page title="Ching Checkout">
      <div>Itemized list goes here {soldCount} {itemName}</div>
      <div>Notes:</div>
      <div>
        <textarea value={note} onChange={(e: any) => setNote(e.target.value)} />
      </div>

      <Button onClick={continueCheckout}>Continue</Button>
    </Page>
  );
};

export default OrderPage;
