import { createWalletClient, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { abstractTestnet } from "viem/chains";
import { eip712WalletActions, getGeneralPaymasterInput } from "viem/zksync";
async function main() {
    const privateKey = generatePrivateKey();
    const account = privateKeyToAccount(privateKey);

    const walletClient = createWalletClient({
        account,
        chain: abstractTestnet,
        transport: http(undefined, {
            onFetchRequest: (request, init) => {

                if (init.body) {
                    const body = JSON.parse(init.body.toString());
                    console.log(`Calling ${body.method}`);
                }
                return init;
            },
        }),
    }).extend(eip712WalletActions());

    walletClient.sendTransaction({
        to: "0xe06ad0Acb3956f98C9dF77Bd02cdFD4426b2208d",
        paymaster:
            "0x5407B5040dec3D339A9247f3654E59EEccbb6391",
        paymasterInput: getGeneralPaymasterInput({
            innerInput: "0x",
        }),
    });
}

if (require.main === module) {
    main();
}
