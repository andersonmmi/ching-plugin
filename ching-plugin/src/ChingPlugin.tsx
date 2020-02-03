import React from "react";
import { BurnerPluginContext, Plugin, Actions } from '@burner-wallet/types';
import axios from "axios";
import OrderPage from './OrderPage';
import ListContainer from './ListContainer'

export function getTxDetails(qr: string) {
  const REGEX = /\/payment\/(0x[0-9a-f]{40})\/((\D\w*)\/)?([\d.]+)\/(\w*)/i
  const scan = REGEX.exec(qr)
  return scan && {
    to: scan[1],
    tokenName: scan[3] || 'xdai',
    amount: scan[4],
    orderId: scan[5],
    url: scan[0],
  }
}

export default class ChingPlugin {
  pluginContext?: BurnerPluginContext;

  initializePlugin(pluginContext: BurnerPluginContext) {
    pluginContext.addPage('/payment', OrderPage);
    // @ts-ignore doesn't show up on confirmation page
    pluginContext.addElement("confirm-bottom", ListContainer);

    // Handle Ching QR codes
    pluginContext.onQRScanned((qr, pluginCtx) => {
      console.log("Scanned:", qr)
      // @ts-ignore doesn't show up on confirmation page
      pluginContext.addElement("confirm-bottom", ListContainer);

      const txDetails = getTxDetails(qr);
      if (!txDetails) {
        return
      }

      pluginCtx.actions.navigateTo(txDetails.url);
      return true;
    });

    // Send txHash to Ching after sending a transaction
    pluginContext.onSent(tx => {
      console.log("Sent:", { tx });

      if (!tx.id) {
        return
      }

      let url =
        "https://us-central1-daipos.cloudfunctions.net/transactionBuffer?" +
        "orderId=" + tx.id +
        "&txHash=" + tx.hash +
        "&networkId=100";

      console.log("Send tx details back:", url);

      axios.get(url).then(response => {
        console.log("Finished hitting the Ching servers:", response);
      });
    });
  }
}
