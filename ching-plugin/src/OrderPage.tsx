import React, { useState } from 'react';
import { PluginPageContext } from '@burner-wallet/types';
import { getTxDetails } from './ChingPlugin';
import ItemsList from "./ItemsList";
import axios from "axios";

const OrderPage: React.FC<PluginPageContext> = ({ location, BurnerComponents, actions }) => {
  const [note, setNote] = useState();
  const [items, setItems] = useState();
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

  // use in an emergency https://cors-anywhere.herokuapp.com/
  axios
    .get('/itemDetails?itemId=RHfVDGM5L2BKPaIwGOXA')
    .then((res) => {
      console.log(res)
    })
    .catch(err =>
      console.log(err)
    )

  const continueCheckout = () => {
    actions.send({
      to: txDetails.to,
      asset: txDetails.tokenName.toLowerCase(),
      ether: txDetails.amount,
      id: txDetails.orderId,
      message: `You shared "${note}" with the message board and you ordered:`,
      // I would like to display the list component below the message
    });
  };

  return (
    <Page title="Ching Checkout">
      <div>Your order includes:</div>
      <ItemsList orderId={txDetails.orderId}/>
      <div>Notes:</div>
      <div>
        <textarea value={note} onChange={(e: any) => setNote(e.target.value)} />
      </div>

      <Button onClick={continueCheckout}>Continue</Button>
    </Page>
  );
};

export default OrderPage;
