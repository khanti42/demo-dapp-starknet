import { useConnect } from "@starknet-react/core"
import { StarknetkitConnector, useStarknetkitConnectModal } from "starknetkit"

const HeaderConnectButton = () => {
  const { connectAsync, connectors } = useConnect()

  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as StarknetkitConnector[],
  })

  return (
    <>
      <button
        className="bg-gradient-to-r from-nebula-from to-nebula-to"
        onClick={async () => {
          const { connector } = await starknetkitConnectModal()
          if (!connector) {
            // or throw error
            return
          }
          await connectAsync({ connector })
        }}
      >
        Connect wallet
      </button>
    </>
  )
}

export { HeaderConnectButton }
