interface IButton {
  type: 'button' | 'submit' | 'reset' | undefined
  children: string
  className?: any
  onClick?: any
}

export default function Button({ type, className, onClick, children }: IButton) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  )
}
