import { useState } from 'react'
import { IScanQR } from '../../interfaces'
import dynamic from 'next/dynamic'
const BarcodeScannerComponent = dynamic(() => import('react-qr-barcode-scanner'), { ssr: false })

export default function ScanQR({ stopStream }: IScanQR) {
  const [webcamResult, setWebcamResult] = useState<string>('Not found')

  return (
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
  )
}
