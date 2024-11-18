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
    <div className="flex flex-col gap-6 w-full h-fit p-6 rounded-xl bg-section-list-button-background">
      <div className="flex pb-4 gap-2 relative border-solid border-b-[1px] border-color-inner-section ">
        {icon ? icon : <IconStatusIcon />}
        <h3 className="text-lg font-semibold leading-6 text-left">
          {sectionTitle}
        </h3>
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
