import { Flex } from "@/components/Flex"
import { useAccount, useSignTypedData } from "@starknet-react/core"
import { useState } from "react"
import { constants, num, stark } from "starknet"
import { Button } from "../Button"
import { Accordion } from "../Accordion"

const SignMessage = () => {
  const { account, address, chainId } = useAccount()
  const [shortText, setShortText] = useState("")
  const [lastSig, setLastSig] = useState<string[]>([])
  const [transactionStatus, setTransactionStatus] = useState<
    "approve" | "pending" | "idle"
  >("idle")

  const hexChainId =
    typeof chainId === "bigint"
      ? (num.toHex(chainId ?? 0) as constants.StarknetChainId)
      : null

  const { signTypedDataAsync } = useSignTypedData({
    params: {
      domain: {
        name: "Example DApp",
        chainId: hexChainId || constants.StarknetChainId.SN_SEPOLIA,
        version: "0.0.1",
      },
      types: {
        StarkNetDomain: [
          { name: "name", type: "felt" },
          { name: "chainId", type: "felt" },
          { name: "version", type: "felt" },
        ],
        Message: [{ name: "message", type: "felt" }],
      },
      primaryType: "Message",
      message: {
        message: shortText,
      },
    },
  })

  const handleSignSubmit = async () => {
    try {
      if (!account) {
        throw new Error("Account not connected")
      }

      setTransactionStatus("approve")
      const result = await signTypedDataAsync()
      setLastSig(stark.formatSignature(result))
      setTransactionStatus("idle")
    } catch (e) {
      console.error(e)
      setTransactionStatus("idle")
    }
  }

  if (!account || !address) {
    return null
  }

  return (
    <>
      <Accordion
        items={[
          {
            title: "Sign Message",
            content: (
              <>
                <Flex flex={1} width="100%">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSignSubmit()
                    }}
                    style={{ width: "100%" }}
                  >
                    <Flex
                      flexDirection="column"
                      flex={1}
                      padding="4"
                      gap="12px"
                      width="100%"
                    >
                      <input
                        type="text"
                        id="short-text"
                        name="short-text"
                        placeholder="Short text"
                        style={{
                          padding: "8px",
                          borderRadius: "8px",
                          border: "1px solid #C8C8C8",
                          width: "100%",
                        }}
                        value={shortText}
                        onChange={(e) => setShortText(e.target.value)}
                      />

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1em",
                        }}
                      >
                        <Button type="submit" hideChevron>
                          Sign
                        </Button>
                      </div>
                    </Flex>
                  </form>
                </Flex>
                <Flex flexDirection="column" flex={1} padding="4" gap="12px">
                  {lastSig && lastSig.length > 0 && (
                    <>
                      {lastSig.length % 2 === 0 ? (
                        <>
                          <textarea
                            id="r"
                            name="r"
                            placeholder="r"
                            value={lastSig[0]}
                            readOnly
                            style={{
                              padding: "8px",
                              borderRadius: "8px",
                              border: "1px solid #C8C8C8",
                            }}
                          />
                          <textarea
                            id="s"
                            name="s"
                            placeholder="s"
                            value={lastSig[1]}
                            readOnly
                            style={{
                              padding: "8px",
                              borderRadius: "8px",
                              border: "1px solid #C8C8C8",
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <Flex flexDirection="column" gap="4px">
                            <h4>Signer</h4>
                            <textarea
                              id="signer"
                              name="signer"
                              placeholder="signer"
                              value={lastSig[2]}
                              readOnly
                              style={{
                                padding: "8px",
                                borderRadius: "8px",
                                border: "1px solid #C8C8C8",
                              }}
                            />
                          </Flex>
                          <Flex flexDirection="column" gap="4px">
                            <h4>r</h4>
                            <textarea
                              id="r"
                              name="r"
                              placeholder="r"
                              value={lastSig[3]}
                              readOnly
                              style={{
                                padding: "8px",
                                borderRadius: "8px",
                                border: "1px solid #C8C8C8",
                              }}
                            />
                          </Flex>
                          <Flex flexDirection="column" gap="4px">
                            <h4>s</h4>
                            <textarea
                              id="s"
                              name="s"
                              placeholder="s"
                              value={lastSig[4]}
                              readOnly
                              style={{
                                padding: "8px",
                                borderRadius: "8px",
                                border: "1px solid #C8C8C8",
                              }}
                            />
                          </Flex>
                          {lastSig.length > 5 && (
                            <>
                              <Flex flexDirection="column" gap="4px">
                                <h4>Cosigner</h4>
                                <textarea
                                  id="signer"
                                  name="signer"
                                  placeholder="signer"
                                  value={lastSig[6]}
                                  readOnly
                                  style={{
                                    padding: "8px",
                                    borderRadius: "8px",
                                    border: "1px solid #C8C8C8",
                                  }}
                                />
                              </Flex>
                              <Flex flexDirection="column" gap="4px">
                                <h4>r</h4>
                                <textarea
                                  id="r"
                                  name="r"
                                  placeholder="r"
                                  value={lastSig[7]}
                                  readOnly
                                  style={{
                                    padding: "8px",
                                    borderRadius: "8px",
                                    border: "1px solid #C8C8C8",
                                  }}
                                />
                              </Flex>
                              <Flex flexDirection="column" gap="4px">
                                <h4>s</h4>
                                <textarea
                                  id="s"
                                  name="s"
                                  placeholder="s"
                                  value={lastSig[8]}
                                  readOnly
                                  style={{
                                    padding: "8px",
                                    borderRadius: "8px",
                                    border: "1px solid #C8C8C8",
                                  }}
                                />
                              </Flex>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </Flex>
              </>
            ),
          },
        ]}
      />
    </>
  )
}

export { SignMessage }
