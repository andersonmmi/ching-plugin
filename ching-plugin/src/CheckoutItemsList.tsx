// @ts-nocheck
import React from 'react';
import { PluginElementContext } from '@burner-wallet/types';
import ItemsList from "./ItemsList";

const CheckoutItemsList: React.FC<PluginElementContext & {tx: any}> = ({ tx }) => {
  console.log("tx", tx)
  return (
    <ItemsList orderId={tx} />
  );
}

export default CheckoutItemsList
