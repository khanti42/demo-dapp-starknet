import { FC, PropsWithChildren, ReactNode } from "react"
import { IconStatusIcon } from "../icons/IconStatusIcon"
import { InfoIcon } from "../icons/InfoIcon"

interface SectionLayoutProps extends PropsWithChildren {
  sectionTitle: string
  icon?: ReactNode
}

const SectionLayout: FC<SectionLayoutProps> = ({
  children,
  sectionTitle,
  icon,
}) => {
  return (
    <div className="flex section-layout-container">
      <div className="flex section-layout-heading">
        {icon ? icon : <IconStatusIcon />}
        <h3 className="section-title">{sectionTitle}</h3>
        <InfoIcon
          style={{
            position: "absolute",
            right: "0",
          }}
        />
      </div>
      <div className="flex column gap-3">{children}</div>
    </div>
  )
}

export { SectionLayout }
