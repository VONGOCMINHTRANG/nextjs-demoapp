export default function Blur({ onClick = () => {} }) {
  return (
    <>
      <div
        className="blur fixed inset-0 bg-gray-600 bg-opacity-70 z-20 transition-opacity duration-300"
        onClick={onClick}
      ></div>
    </>
  )
}
