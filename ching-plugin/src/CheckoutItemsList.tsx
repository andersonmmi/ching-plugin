// @ts-nocheck
import React, { PluginElementContext } from 'react';
import { PluginElementContext } from '@burner-wallet/types';
import ItemsList from "./ItemsList";
import ChingPlugin from "./ChingPlugin";

const CheckoutItemsList: React.FC<PluginElementContext & {tx: any}> = ({ tx }) => {
  if (!tx.id) {
    return null;
  }

  return (
    <ItemsList orderId={tx.id} plugin={ChingPlugin}/>
  );
}

export default CheckoutItemsList as ComponentType<PluginElementContext>;
