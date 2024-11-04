import { useConnect } from "@starknet-react/core"
import { Button } from "../ui/Button"
import { StarknetkitConnector, useStarknetkitConnectModal } from "starknetkit"

const ConnectStarknetkitModal = () => {
  const { connectAsync, connectors } = useConnect()

  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as StarknetkitConnector[],
  })

  return (
    <Button
      className="full"
      onClick={async () => {
        const { connector } = await starknetkitConnectModal()
        if (!connector) return // or throw error
        await connectAsync({ connector: connector as any })
      }}
    >
      Starknetkit Modal
    </Button>
  )
}

export { ConnectStarknetkitModal }
