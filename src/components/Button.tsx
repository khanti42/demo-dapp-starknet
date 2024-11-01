import { ButtonHTMLAttributes, FC, HTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hideChevron?: boolean
}

const Button: FC<ButtonProps> = ({
  onClick,
  children,
  style,
  hideChevron,
  ...props
}) => (
  <button
    style={{
      border: "1px solid #C8C8C8",
      backgroundColor: "transparent",
      borderRadius: "8px",
      padding: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer",
      gap: "4px",
      fontWeight: "bold",
      ...style,
    }}
    {...props}
    onClick={onClick}
  >
    {children}

    {!hideChevron && (
      <svg
        style={{
          width: "16px",
          height: "16px",
          transition: "transform 0.2s",
          transform: "rotate(-90deg)",
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
    )}
  </button>
)

export { Button }
