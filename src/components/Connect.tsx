import { useAccount, useConnect } from "@starknet-react/core"
import React, {
  CSSProperties,
  FC,
  HTMLAttributes,
  useEffect,
  useState,
} from "react"
import { Flex } from "./Flex"
import {
  disconnect,
  StarknetkitConnector,
  useStarknetkitConnectModal,
} from "starknetkit"
import { Accordion } from "./Accordion"
import { Button } from "./Button"

const Connect = () => {
  const { isConnected } = useAccount()
  const { connectAsync, connectors } = useConnect()
  const [isClient, setIsClient] = useState(false)

  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as StarknetkitConnector[],
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <></>
  }

  return (
    <Flex flexDirection="column" gap="12px">
      <Accordion
        isDefaultOpen
        items={[
          {
            title: "Connection",
            content: (
              <Flex gap="12px">
                <Flex flex={1} flexDirection="column" gap="12px">
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

                  <Accordion
                    withBorder
                    items={[
                      {
                        title: "starknet-react connectors",
                        content: (
                          <Flex
                            flex={1}
                            flexDirection="column"
                            gap="12px"
                            padding="8px"
                          >
                            {connectors.map((connector) => {
                              if (!connector.available()) {
                                return <React.Fragment key={connector.id} />
                              }

                              return (
                                <Button
                                  className="full"
                                  key={connector.id}
                                  onClick={async () => {
                                    await connectAsync({ connector })
                                  }}
                                >
                                  {connector.name}
                                </Button>
                              )
                            })}
                          </Flex>
                        ),
                      },
                    ]}
                  />
                </Flex>

                <Flex flex={1} height="fit-content">
                  <Button
                    className="full"
                    onClick={() => disconnect()}
                    disabled={!isConnected}
                  >
                    Disconnect
                  </Button>
                </Flex>
              </Flex>
            ),
          },
        ]}
      />
    </Flex>
  )
}

export { Connect }
