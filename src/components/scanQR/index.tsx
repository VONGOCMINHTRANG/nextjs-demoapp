import { IScanQR } from '../../interfaces'
import dynamic from 'next/dynamic'
import Button from '../button'
const BarcodeScannerComponent = dynamic(() => import('react-qr-barcode-scanner'), { ssr: false })

export default function ScanQR({ stopStream, setWebcamResult, closeCam }: IScanQR) {
  return (
    <>
      <BarcodeScannerComponent
        width="350px"
        height="350px"
        onUpdate={(err: any, result: any) => {
          if (result) {
            setWebcamResult(result?.text)
          } else {
            setWebcamResult('')
          }
        }}
        stopStream={stopStream}
      />

      <Button
        type="button"
        className="bg-red-500 p-2 rounded-md hover:bg-red-400 w-fit mx-auto transition-all text-white font-medium"
        onClick={closeCam}
      >
        Close webcam
      </Button>
    </>
  )
}
