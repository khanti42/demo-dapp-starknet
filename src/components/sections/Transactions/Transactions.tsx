import { Flex } from "@/components/ui/Flex"
import { Accordion } from "../../ui/Accordion"
import { Button } from "../../ui/Button"
import { useState } from "react"
import { SendERC20 } from "../Transactions/SendERC20"
import { SimpleTransaction } from "../Transactions/SimpleTransaction"
import { useAccount } from "@starknet-react/core"
import { SendMulticall } from "../Transactions/SendMulticall"

const Transactions = () => {
  const [showErc20, setShowErc20] = useState(false)
  const { account, address } = useAccount()

  if (!account || !address) {
    return null
  }

  return (
    <>
      <Accordion
        items={[
          {
            title: "Transactions",
            content: (
              <>
                <Flex gap="12px">
                  <Flex flexDirection="column" flex="1" gap="8px">
                    <Button
                      className="full"
                      onClick={() => {
                        setShowErc20((prev) => !prev)
                      }}
                    >
                      Send ERC20
                    </Button>
                    <SimpleTransaction address={address} />
                  </Flex>
                  <Flex flexDirection="column" flex="1">
                    <SendMulticall />
                  </Flex>
                </Flex>
              </>
            ),
          },
        ]}
      />

      {showErc20 && <SendERC20 />}
    </>
  )
}

export { Transactions }
