import { ETHTokenAddress } from "@/constants"
import { CallData } from "starknet"
import { useWalletRequest } from "@starknet-react/core"
import { parseInputAmountToUint256 } from "@/helper/token"
import { Flex } from "../../Flex"
import { Button } from "../../Button"
import { FC } from "react"

const SimpleTransaction: FC<{ address: string }> = ({ address }) => {
  const walletRequest = useWalletRequest({
    type: "wallet_addInvokeTransaction",
    params: {
      calls: [
        {
          contract_address: ETHTokenAddress,
          entry_point: "transfer",
          calldata: CallData.compile({
            address: address || "",
            amount: parseInputAmountToUint256("0.0000001"),
          }),
        },
      ],
    },
  })

  return (
    <>
      <Flex
        color="black"
        borderWidth="0px"
        borderRadius="8px"
        justifyContent="flex-start"
        width="100%"
      >
        <Button
          className="full"
          onClick={async () => {
            const r = await walletRequest.requestAsync()
            alert(`Transaction sent: ${r.transaction_hash}`)
          }}
        >
          Simple Transaction
        </Button>
      </Flex>
    </>
  )
}

export { SimpleTransaction }
