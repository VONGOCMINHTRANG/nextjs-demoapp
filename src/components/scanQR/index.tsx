import { useState } from 'react'
import QrReader from 'react-qr-reader'
import { IScanQR } from '../../interfaces'

export default function ScanQR({ onClick, openWebcam }: IScanQR) {
  const [webcamResult, setWebcamResult] = useState<any>()
  const webcamScan = (result: any) => {
    if (result) {
      setWebcamResult(result)
    }
  }

  const handleError = (error: any) => {
    if (error) {
      console.log(error)
    }
  }

  return (
    <div className={`fixed m-auto ${!openWebcam && 'hidden'}`}>
      <div className="w-96 h-96 mb-4">
        <QrReader
          delay={3000}
          onScan={webcamScan}
          legacyMode={false}
          resolution={800}
          facingMode={'user'}
          onError={handleError}
        />
      </div>
      <button onClick={onClick}>Close webcam</button>
    </div>
  )
}
