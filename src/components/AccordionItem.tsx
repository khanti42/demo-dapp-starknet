import React, { FC } from "react"

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  isOpen: boolean
  onClick: () => void
  withBorder?: boolean
}

// TODO: move global css
const styles = {
  button: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  title: {
    fontWeight: "bold",
  },
  icon: {
    width: "16px",
    height: "16px",
    transition: "transform 0.2s",
  },
  iconOpen: {
    transform: "rotate(180deg)",
  },
  content: {
    overflow: "hidden",
    transition: "max-height 0.2s ease-out",
    maxHeight: "0",
  },
  contentOpen: {
    maxHeight: "500px",
  },
}

const AccordionItem: FC<AccordionItemProps> = ({
  title,
  children,
  isOpen,
  onClick,
  withBorder,
}) => {
  return (
    <div>
      <button
        style={{
          ...styles.button,
          ...(withBorder ? { padding: "8px" } : { padding: "16px 0" }),
        }}
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span
          style={{
            ...styles.title,

            ...(withBorder ? { fontSize: "1em" } : { fontSize: "1.5em" }),
          }}
        >
          {title}
        </span>
        <svg
          style={{
            ...styles.icon,
            ...(isOpen ? styles.iconOpen : {}),
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        style={{
          ...styles.content,
          ...(isOpen ? styles.contentOpen : {}),
        }}
      >
        <div>{children}</div>
      </div>
    </div>
  )
}

export { AccordionItem }
