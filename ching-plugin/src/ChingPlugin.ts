import { BurnerPluginContext, Plugin, Actions } from '@burner-wallet/types';

interface PluginActionContext {
  actions: Actions;
}

export default class ChingPlugin implements Plugin {
  private pluginContext?: BurnerPluginContext;

  initializePlugin(pluginContext: BurnerPluginContext) {
    this.pluginContext = pluginContext;

    onQRScanned: ((scan: string, ctx: PluginActionContext) => {
      if (scan === 'My Plugin') {
        ctx.actions.navigateTo('/my-page');
        return true;
      }
    });
  }

  async getBlockNum() {
    const assets = this.pluginContext!.getAssets();
    const web3 = this.pluginContext!.getWeb3(assets[0].network);
    const blockNum = web3.eth.getBlockNumber();
    return blockNum;
  }
}
