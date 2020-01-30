import React, { useState } from 'react';
import { PluginPageContext } from '@burner-wallet/types';
import { getTxDetails } from './ChingPlugin';

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

  return (
    <Page title="Ching Checkout">
      <div>Notes:</div>
      <div>
        <textarea value={note} onChange={(e: any) => setNote(e.target.value)} />
      </div>

      <Button onClick={continueCheckout}>Continue</Button>
    </Page>
  );
};

export default OrderPage;
