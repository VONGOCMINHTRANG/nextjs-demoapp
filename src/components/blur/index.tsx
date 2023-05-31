import { IBlur } from '../../interfaces'

export default function Blur({ onClick = () => {} }: IBlur) {
  return (
    <>
      <div
        className="blur fixed inset-0 bg-gray-600 bg-opacity-70 z-40 transition-opacity duration-300"
        onClick={onClick}
      ></div>
    </>
  )
}
