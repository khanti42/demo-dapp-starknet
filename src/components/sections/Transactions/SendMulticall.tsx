// TokenOperations.tsx
import { ETHTokenAddress, provider } from "@/constants"
import { parseInputAmountToUint256 } from "@/helper/token"
import {
  Abi,
  useAccount,
  useContract,
  useSendTransaction,
} from "@starknet-react/core"
import { useState } from "react"
import { Button } from "../../ui/Button"
import { Flex } from "@/components/ui/Flex"

const abi = [
  {
    type: "function",
    name: "transfer",
    state_mutability: "external",
    inputs: [
      {
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "amount",
        type: "core::integer::u256",
      },
    ],
    outputs: [],
  },
] as const satisfies Abi

const SendMulticall = () => {
  const { account } = useAccount()

  const [lastTxStatus, setLastTxStatus] = useState("idle")
  const [lastTxError, setLastTxError] = useState("")

  const { contract } = useContract({
    abi,
    address: ETHTokenAddress,
  })

  const { sendAsync } = useSendTransaction({
    calls:
      contract && account?.address
        ? [
            contract.populate("transfer", [
              account?.address,
              parseInputAmountToUint256("0.000000001"),
            ]),
            contract.populate("transfer", [
              account?.address,
              parseInputAmountToUint256("0.000000002"),
            ]),
          ]
        : undefined,
  })

  const buttonsDisabled = ["approve"].includes(lastTxStatus)

  const handleTransferSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      setLastTxStatus("approve")
      const { transaction_hash } = await sendAsync()
      await provider.waitForTransaction(transaction_hash)
      alert(`Transaction sent: ${transaction_hash}`)
    } catch (error) {
      setLastTxError((error as Error).message)
    } finally {
      setLastTxStatus("idle")
    }
  }

  return (
    <Flex flexDirection="column" gap="8px">
      <Button
        className="full"
        onClick={handleTransferSubmit}
        disabled={buttonsDisabled}
      >
        Send Multicall
      </Button>
      {lastTxError ? (
        <span style={{ color: "red" }}>Error: {lastTxError}</span>
      ) : null}
    </Flex>
  )
}

export { SendMulticall }
