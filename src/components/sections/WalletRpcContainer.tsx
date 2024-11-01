import { ETHTokenAddress } from "@/constants"
import { CallData, constants, num, shortString } from "starknet"
import { WalletRpc } from "./WalletRpc"
import { parseInputAmountToUint256 } from "@/helper/token"
import { useAccount } from "@starknet-react/core"
import { useEffect, useState } from "react"

const WalletRpcContainer = () => {
  const { address } = useAccount()
  const [gridTemplateColumns, setGridTemplateColumns] = useState("1fr")

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const handleResize = () => {
      setGridTemplateColumns(
        window.innerWidth >= 768 ? "repeat(3, 1fr)" : "1fr",
      )
    }

    handleResize() // Initial check
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!address) {
    return null
  }
  return (
    <>
      <h2>Wallet RPC</h2>
      <div
        style={{
          display: "grid",
          gap: "20px",
          padding: "20px",
          gridTemplateColumns: gridTemplateColumns,
        }}
      >
        <WalletRpc request={{ type: "wallet_requestAccounts", params: {} }} />
        <WalletRpc request={{ type: "wallet_requestChainId", params: {} }} />
        <WalletRpc
          request={{
            type: "wallet_watchAsset",
            params: {
              type: "ERC20",
              options: {
                address:
                  "0x62376175ba2ddc307b30813312d8f09796f777b8c24dd327a5cdd65c3539fba",
                decimals: 18,
                name: "snjs6-celebration",
                symbol: "snsj6",
              },
            },
          }}
        />
        <WalletRpc
          request={{
            type: "wallet_switchStarknetChain",
            params: {
              chainId: constants.StarknetChainId.SN_MAIN,
            },
          }}
        />
        <WalletRpc
          request={{
            type: "wallet_addStarknetChain",
            params: {
              id: "ZORG",
              chain_id: shortString.encodeShortString("ZORG"), // A 0x-prefixed hexadecimal string
              chain_name: "ZORG",
              rpc_urls: ["http://192.168.1.44:6060"],
              native_currency: {
                type: "ERC20",
                options: {
                  address: ETHTokenAddress, // Not part of the standard, but required by StarkNet as it can work with any ERC20 token as the fee token
                  name: "ETHEREUM",
                  symbol: "ETH", // 2-6 characters long
                  decimals: 18,
                },
              },
            },
          }}
        />

        <WalletRpc
          request={{
            type: "wallet_addInvokeTransaction",
            params: {
              calls: [
                {
                  contract_address: ETHTokenAddress,
                  entry_point: "increaseAllowance",
                  calldata: CallData.compile({
                    spender: address,
                    addedValue: parseInputAmountToUint256("0.0001"),
                  }),
                },
              ],
            },
          }}
        />
        <WalletRpc
          request={{
            type: "wallet_signTypedData",
            params: {
              domain: {
                chainId: constants.StarknetChainId.SN_SEPOLIA, // TODO: change with connector data
                name: "myDapp",
                version: "0.0.1",
              },
              message: {
                message: `test message ${Math.floor(Math.random() * 1000)}`,
              },
              primaryType: "Message",
              types: {
                Message: [
                  {
                    name: "message",
                    type: "string",
                  },
                ],
                StarkNetDomain: [
                  {
                    name: "name",
                    type: "felt",
                  },
                  {
                    name: "chainId",
                    type: "felt",
                  },
                  {
                    name: "version",
                    type: "felt",
                  },
                ],
              },
            },
          }}
        />
        <WalletRpc
          request={{
            type: "wallet_supportedSpecs",
          }}
        />
        <WalletRpc request={{ type: "wallet_getPermissions" }} />
        <WalletRpc request={{ type: "wallet_deploymentData" }} />
      </div>
    </>
  )
}

export { WalletRpcContainer }
