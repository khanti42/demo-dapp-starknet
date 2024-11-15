import { isMainnet, toHexChainid } from "@/helpers/chainId"
import { formatTruncatedAddress } from "@/helpers/formatAddress"
import { useAccount, useBalance } from "@starknet-react/core"
import { AvatarIcon } from "./icons/AvatarIcon"
import { LogoIcon } from "./icons/LogoIcon"
import { WalletIcon } from "./icons/WalletIcon"
import { ExternalIcon } from "./icons/ExternalIcon"

const Header = () => {
  const { address, isConnected, chainId } = useAccount()

  const { data: balance } = useBalance({
    address: address,
  })

  const hexChainId = toHexChainid(chainId)

  return (
    <div className="flex header-container bg-heading-bg">
      <div className="flex gap-3 items-center w-full">
        <LogoIcon />
        <h1 className="header-title">Demo dapp</h1>
        <div className="flex flex-1 w-full" />

        {isConnected && (
          <div className="flex  border-col rounded-lg gap-3 p-3 border-2 border-solid border-default-color font-medium">
            <div className="flex items-center gap-2">
              <WalletIcon />
              {balance
                ? balance?.formatted.length > 7
                  ? `${balance.formatted.slice(0, 7)} ETH`
                  : `${balance?.formatted} ETH`
                : "0 ETH"}
            </div>
            <div className="header-account-separator" />
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={() =>
                window.open(
                  isMainnet(hexChainId)
                    ? `https://voyager.online/contract/${address}`
                    : `https://sepolia.voyager.online/contract/${address}`,
                  "_blank",
                )
              }
            >
              <AvatarIcon />
              {formatTruncatedAddress(address || "")}
              <ExternalIcon />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export { Header }
