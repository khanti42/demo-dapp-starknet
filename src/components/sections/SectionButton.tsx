import { FC } from "react"
import { Button } from "../ui/Button"
import { Section } from "./types"

interface SectionButtonProps {
  disabled?: boolean
  section: Section
  selected: boolean
  setSection: (
    value?: ((prevState?: Section | undefined) => Section) | undefined,
  ) => void
}

const SectionButton: FC<SectionButtonProps> = ({
  disabled,
  section,
  selected,
  setSection,
}) => {
  return (
    <Button
      selected={selected}
      className={`text-section-list-button-text justify-between bg-section-list-button-background ${disabled ? "disabled" : ""}`}
      disabled={disabled}
      onClick={() =>
        setSection((prev?: Section) => (prev === section ? section : section))
      }
    >
      {section}
    </Button>
  )
}

export { SectionButton }
