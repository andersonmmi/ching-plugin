import React, { useState } from 'react';
import { PluginPageContext, BurnerPluginContext, Plugin, Actions } from '@burner-wallet/types';
import ChingPlugin, { getTxDetails } from './ChingPlugin';
import ItemsList from "./ItemsList";
import CheckoutItemsList from './CheckoutItemsList';
import charityAlgo from './charityAlgo';
let charityArray: Array<String> = [];

const OrderPage: React.FC<PluginPageContext> = ({ location, BurnerComponents, actions }) => {
  // const [note, setNote] = useState();
  const [items, setItems] = useState();
  const txDetails = getTxDetails(location.pathname);
  const { Button, Page } = BurnerComponents;
  let message: any = null;

  if (!txDetails) {
    return (
      <Page title="Ching Checkout">
        Invalid order
      </Page>
    );
  }

  charityAlgo(txDetails).then(res => charityArray = res)


  const continueCheckout = () => {
    actions.send({
      to: txDetails.to,
      asset: txDetails.tokenName.toLowerCase(),
      ether: txDetails.amount,
      id: txDetails.orderId,
      message: `I:${txDetails.orderId},${message ? 'N:' + message + ',' : ''}C:${charityArray}`,
      // @DEV: I would like to display the list component below the message
    });
  };

  // if(!items) return "loading..."
  return (
    <Page title="Ching Checkout">
      <div>Your order includes:</div>
      {/*
      // @ts-ignore */}
      <ItemsList orderId={txDetails.orderId} plugin={ChingPlugin}/>
      <div>Notes:</div>
      <div>
        <textarea value={message} onChange={(e: any) => message = e.target.value} />
      </div>

      <Button onClick={continueCheckout}>Continue</Button>
    </Page>
  );
};

export default OrderPage;
