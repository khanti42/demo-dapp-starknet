import { CSSProperties, FC, ReactNode } from "react"

interface FlexProps extends CSSProperties {
  children: ReactNode
}

const Flex: FC<FlexProps> = ({ children, ...props }) => {
  return <div style={{ display: "flex", ...props }}>{children}</div>
}

export { Flex }
