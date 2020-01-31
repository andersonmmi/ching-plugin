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

  const continueCheckout = () => {
    actions.send({
      to: txDetails.to,
      asset: txDetails.tokenName.toLowerCase(),
      ether: txDetails.amount,
      id: txDetails.orderId,
      message: `Ching order - "${note}"`
    });
  };

  // just need to render some data from the endpoint
  // let itemizedList = () => {
  //   axios.get("https://us-central1-daipos.cloudfunctions.net/orderDetails?orderId=13VwSGhmVuwjpLKFmqd7")
  // }

  let itemizedList;

  axios.get("https://us-central1-daipos.cloudfunctions.net/itemDetails?itemId=RHfVDGM5L2BKPaIwGOXA"
    // , {
    //   headers: {
    //     'Content-Type': 'document',
    //     'Access-Control-Allow-Origin': '*',
    //     'crossdomain': true
    //   }
    // }
  )
    .then(response => {
          itemizedList = response;
        });

  return (
    <Page title="Ching Checkout">
      <div>Itemized list goes here</div>
      <div>{itemizedList}</div>
      <div>Notes:</div>
      <div>
        <textarea value={note} onChange={(e: any) => setNote(e.target.value)} />
      </div>

      <Button onClick={continueCheckout}>Continue</Button>
    </Page>
  );
};

export default OrderPage;
