// TokenOperations.tsx
import { ETHTokenAddress } from "@/constants"
import { parseInputAmountToUint256 } from "@/helper/token"
import {
  Abi,
  useAccount,
  useContract,
  useSendTransaction,
} from "@starknet-react/core"
import { useState } from "react"
import { Button } from "../../ui/Button"

// ERC20 ABI with approve and transfer functions
const erc20ABI = [
  {
    name: "increaseAllowance",
    type: "function",
    inputs: [
      {
        name: "spender",
        type: "felt",
      },
      {
        name: "amount",
        type: "Uint256",
      },
    ],
    outputs: [
      {
        name: "success",
        type: "felt",
      },
    ],
    state_mutability: "external",
  },
  {
    name: "transfer",
    type: "function",
    inputs: [
      {
        name: "recipient",
        type: "felt",
      },
      {
        name: "amount",
        type: "Uint256",
      },
    ],
    outputs: [
      {
        name: "success",
        type: "felt",
      },
    ],
    state_mutability: "external",
  },
] as const

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
  const { address, account } = useAccount()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)

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
              parseInputAmountToUint256("0.0000001"),
            ]),
            contract.populate("transfer", [
              account?.address,
              parseInputAmountToUint256("0.0000001"),
            ]),
          ]
        : undefined,
  })

  const handleTransferSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      /* setTransactionStatus("approve") */
      const { transaction_hash } = await sendAsync()
      alert(`Transaction sent: ${transaction_hash}`)
      /* setTransactionStatus("pending") */
    } catch (error) {
      console.error(error)
      /* setTransactionStatus("idle") */
    }
  }

  // Function to execute approve and transfer separately

  return (
    <Button className="full" onClick={handleTransferSubmit}>
      Send Multicall
    </Button>

    /*  <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Token Operations</h2>

      <div className="mb-4">
        <button
          onClick={() => performApproveAndTransfer()}
          disabled={loading || !contract}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Approve and Transfer 1 ETH (Multicall)
        </button>
      </div>

      {loading && (
        <div className="text-blue-500">Processing transaction...</div>
      )}

      {error && <div className="text-red-500">Error: {error.message}</div>}

      {txHash && (
        <div className="text-green-500">
          Transaction successful! Hash: {txHash}
        </div>
      )}
    </div> */
  )
}

export { SendMulticall }
