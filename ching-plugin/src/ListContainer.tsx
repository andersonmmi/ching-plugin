// @ts-nocheck
import React, { useState } from 'react';
import { PluginPageContext } from '@burner-wallet/types';
import { getTxDetails } from './ChingPlugin';
import ItemsList from "./ItemsList";

const CheckoutItemsList: React.FC<PluginElementContext & {tx: any}> = ({ tx }) => {
  return (
    <ItemsList orderId={tx.id} />
  );
}
