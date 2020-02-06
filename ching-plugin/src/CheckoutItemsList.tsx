// @ts-nocheck
import React, { PluginElementContext } from 'react';
import { PluginElementContext } from '@burner-wallet/types';
import ItemsList from "./ItemsList";


const CheckoutItemsList: React.FC<PluginElementContext & {tx: any}> = ({ tx }) => {
  if (!tx.id) {
    return null;
  }

  return (
    <ItemsList orderId={tx.id} />
  );
}

export default CheckoutItemsList as ComponentType<PluginElementContext>;
