// @ts-nocheck
import React from 'react';
import { PluginElementContext } from '@burner-wallet/types';
import ItemsList from "./ItemsList";

const CheckoutItemsList: React.FC<PluginElementContext & {tx: any}> = ({ tx }) => {
  return (
    <div>
      <div>WHOA BUDDY</div>
      <ItemsList orderId={tx.id} />
    </div>
  );
}

export default CheckoutItemsList
