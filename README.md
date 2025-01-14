# zkSync viem gas estimation

### Directions

```
git clone https://github.com/coffeexcoin/zksync-viem-tx.git
cd zksync-viem-tx
pnpm install
pnpm run start
```

Observe the series of RPC calls that are made to send a zksync transaction

```
Calling eth_getBlockByNumber
Calling eth_maxPriorityFeePerGas
Calling eth_estimateGas
Calling eth_getTransactionCount
Calling eth_chainId
Calling eth_chainId
Calling eth_sendRawTransaction
```

Observe that `zks_estimateFee` is never called.