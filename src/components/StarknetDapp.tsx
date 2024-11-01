"use client"
import { SignMessage } from "@/components/sections/SignMessage"
import { Transactions } from "@/components/sections/Transactions/Transactions"
import { Connect } from "./Connect"
import { Flex } from "./Flex"
import { AccountSection } from "./sections/AccountSection"
import { AddToken } from "./sections/ERC20/AddToken"
import { Network } from "./sections/Network/Network"

const StarknetDapp = () => {
  //useWaitForTx()

  return (
    <Flex
      flexDirection="column"
      maxWidth="500px"
      width="100%"
      margin="0 auto"
      gap="24px"
    >
      <AccountSection />
      <Connect />
      <Transactions />
      <SignMessage />
      <Network />
      <AddToken />
    </Flex>
  )
}

export { StarknetDapp }
