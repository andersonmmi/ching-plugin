import { BurnerPluginContext, Plugin, Actions } from '@burner-wallet/types';
import axios from "axios";

export default class ChingPlugin implements Plugin {
  private pluginContext?: BurnerPluginContext;

  initializePlugin(pluginContext: BurnerPluginContext) {
    this.pluginContext = pluginContext;
  }
}
