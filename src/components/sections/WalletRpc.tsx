import { RequestFnCall, RpcMessage } from "@starknet-io/types-js"
import { useState } from "react"
import { useWalletRequest } from "@starknet-react/core"
import { Flex } from "@/components/ui/Flex"

type Props = {
  request: RequestFnCall<RpcMessage["type"]>
}

const WalletRpc = ({ request }: Props) => {
  const walletRequest = useWalletRequest({
    type: request.type,
    params: request.params,
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
        <button
          onClick={async () => {
            const r =
              (await walletRequest.requestAsync()) as typeof request.type
            console.log(r)
          }}
        >
          {request.type}
        </button>
      </Flex>
    </>
  )
}

export { WalletRpc }
