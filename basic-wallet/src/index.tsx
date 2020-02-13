import React from 'react';
import ReactDOM from 'react-dom';
import { xdai, dai, eth, ERC20Asset } from '@burner-wallet/assets';
import BurnerCore from '@burner-wallet/core';
import { InjectedSigner, LocalSigner } from '@burner-wallet/core/signers';
import { InfuraGateway, InjectedGateway, XDaiGateway, } from '@burner-wallet/core/gateways';
import Exchange, { Uniswap, XDaiBridge } from '@burner-wallet/exchange';
import ModernUI from '@burner-wallet/modern-ui';
import ChingPlugin from 'ching-plugin';

const it = new ERC20Asset({
  id: "buf",
  name: "BUF",
  network: "100",
  address: "0x38473B255366A6B59b035DB9a5aE3608126F6869"
});

const core = new BurnerCore({
  signers: [new InjectedSigner(), new LocalSigner()],
  gateways: [
    new InjectedGateway(),
    new InfuraGateway(process.env.REACT_APP_INFURA_KEY),
    new XDaiGateway(),
  ],
  assets: [xdai, it, dai, eth],
});

const exchange = new Exchange({
  pairs: [new XDaiBridge(), new Uniswap('dai')],
});

const BurnerWallet = () =>
  <ModernUI
    title="Basic Wallet"
    core={core}
    plugins={[exchange, ChingPlugin]}
  />


ReactDOM.render(<BurnerWallet />, document.getElementById('root'));
