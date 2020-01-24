import React, { useEffect, useState } from 'react';
import { PluginElementContext } from '@burner-wallet/types';
import ChingPlugin from '../ChingPlugin';

const MyElement: React.FC<PluginElementContext> = ({ plugin }) => {
  const [block, setBlock] = useState<number | null>(null);
  const _plugin = plugin as ChingPlugin;

  useEffect(() => {
    _plugin.getBlockNum().then((num: number) => setBlock(num))
  }, []);

  return (
    <div>
      <div>Injected plugin element</div>
      {block && (
        <div>Current block number: {block}</div>
      )}
    </div>
  );
};

export default MyElement;
