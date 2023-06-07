import { IoIosArrowBack } from 'react-icons/io'
import Layout from '../../components/layouts'
import qrCode from 'qrcode'
import { useForm } from 'react-hook-form'
import { useState, useRef } from 'react'
import MenuAccount from '../../components/menu/menuAccount'
import Blur from '../../components/blur'
import { useDispatch, useSelector } from 'react-redux'
import { setToggle } from '../../redux/slice/toggleSlice'
import ChangePassword from '../../components/change-password'
import Button from '../../components/button'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const BarcodeScannerComponent = dynamic(() => import('react-qr-barcode-scanner'), { ssr: false })

export default function SetUpQR() {
  const dispatch = useDispatch()
  const nodeRef = useRef(null)
  const [imageQR, setImageQR] = useState<string>('')
  const [, setOpen] = useState<boolean>(true)
  const [openWebcam, setOpenWebcam] = useState<boolean>(false)
  const [data, setData] = useState<string>('Scan QR data')
  const [stopStream, setStopStream] = useState<boolean>(false)
  const toggle = useSelector((state: any) => state.toggle.toggleState)
  const {
    getValues,
    handleSubmit,
    formState: { isValid, errors },
    register,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      fullname: '',
      email: '',
      phone: '',
    },
  })

  const generateQrCode = async (values: any) => {
    if (!isValid) return
    if (getValues('fullname') != '' && getValues('email') != '' && getValues('phone') != '') {
      setOpen(true)
    }

    const image: Promise<string> = qrCode.toDataURL(JSON.stringify(values))
    image
      .then((result) => {
        console.log('result >>', result)
        setImageQR(result)
      })
      .catch((error) => {
        console.log(error)
      })

    reset({
      fullname: '',
      email: '',
      phone: '',
    })
  }

  const openCam = async () => {
    const height: any = nodeRef.current
    const bottomOfElement = height.offsetHeight + 200
    window.scroll({ top: bottomOfElement, behavior: 'smooth' })
    setOpenWebcam(true)
    setStopStream(false)
  }

  const closeCam = async () => {
    const height: any = nodeRef.current
    const topOfElement = height.offsetHeight - 2000
    window.scroll({ top: topOfElement, behavior: 'smooth' })
    setOpenWebcam(false)
    setStopStream(true)
  }

  console.log(data)

  return (
    <>
      <div className="flex flex-col flex-1 cursor-pointer" id="setupQR" ref={nodeRef}>
        <div className="mb-6 flex items-center text-green-500 font-medium">
          <IoIosArrowBack className="w-6 h-6" />
          <span>Trở về cài đặt</span>
        </div>
        <div className="flex flex-1 w-full flex-col">
          <MenuAccount></MenuAccount>

          <hr />

          <div className="flex flex-col lg:flex-row py-6 w-full items-center bg-[#f7faff] h-auto rounded-b-xl">
            <div className="bg-white w-5/6 xl:w-4/6 mx-7 h-auto mb-5">
              <div className="px-7 flex justify-between py-3">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-black">Thông tin thiết lập mã QR</span>
                </div>
              </div>
              <hr />
              <div className="px-4 md:px-24 py-5">
                <form onSubmit={handleSubmit(generateQrCode)} className="flex flex-col w-full">
                  <div className="mb-8 flex flex-col">
                    <div className="flex flex-col md:flex-row gap-y-2 justify-between text-sm border-dotted border-b-2 py-3">
                      <span className="text-black">Tên tài khoản</span>
                      <input
                        type="text"
                        className="border-2 w-full md:w-72  p-1 outline-none focus:ring-1 text-black placeholder:italic rounded-md"
                        placeholder="Nhập tên tài khoản"
                        {...register('fullname', { required: true })}
                      />
                      {errors?.fullname?.type === 'required' && (
                        <div className="text-red-500 text-xs italic">Vui lòng không bỏ trống</div>
                      )}
                    </div>

                    <div className="flex flex-col md:flex-row gap-y-2 justify-between text-sm border-dotted border-b-2 py-3">
                      <span className="text-black">Email</span>
                      <div>
                        <input
                          type="email"
                          className="border-2 w-full md:w-72 p-1 outline-none focus:ring-1 text-black placeholder:italic rounded-md"
                          placeholder="Nhập email"
                          {...register('email', { required: true })}
                        />
                        {errors?.email?.type === 'required' && (
                          <div className="text-red-500 text-xs italic">Vui lòng không bỏ trống</div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-y-2 justify-between text-sm border-dotted border-b-2 py-3">
                      <span className="text-black">Số điện thoại (Tài khoản mặc định)</span>
                      <div>
                        <input
                          type="number"
                          className="border-2 w-full md:w-72 p-1 outline-none focus:ring-1 text-black placeholder:italic rounded-md"
                          placeholder="Nhập số điện thoại"
                          {...register('phone', { required: true, minLength: 10, maxLength: 10 })}
                        />
                        {errors?.phone?.type === 'required' && (
                          <div className="text-red-500 text-xs italic">Vui lòng không bỏ trống</div>
                        )}
                        {errors?.phone?.type === 'minLength' && (
                          <div className="text-red-500 text-xs italic">
                            Vui lòng nhập ít nhất 10 số
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="bg-blue-500 py-2 px-4 font-medium rounded-md hover:bg-blue-400 transition-all text-white flex mx-auto"
                  >
                    Tạo mã
                  </Button>
                </form>

                <div className="text-black">{data}</div>
              </div>
            </div>
            <div className="relative text-black flex items-center flex-col">
              <div className="flex justify-center font-medium mb-2">MÃ QR CỦA BẠN</div>
              {imageQR ? (
                <img src={imageQR} alt="Image QR" className="w-60 h-60 mb-2" />
              ) : (
                <form>
                  <fieldset disabled className="opacity-50">
                    <img src="/default-qr.png" alt="Image QR" className="w-60 h-60 mb-2" />
                  </fieldset>
                </form>
              )}
              <div className="flex lg:flex-col lg:items-center gap-3 text-white text-sm font-medium">
                {imageQR ? (
                  <Link href={imageQR} download>
                    <Button
                      type="button"
                      className="bg-green-500 p-2 rounded-md hover:bg-green-400 transition-all"
                    >
                      Tải xuống
                    </Button>
                  </Link>
                ) : (
                  <Button
                    type="button"
                    className="bg-green-500 p-2 rounded-md hover:bg-green-400 transition-all"
                  >
                    Tải xuống
                  </Button>
                )}

                <Button
                  type="button"
                  className="bg-yellow-500 p-2 rounded-md hover:bg-yellow-400 transition-all"
                  onClick={openCam}
                >
                  Scan QR có sẵn
                </Button>
              </div>
            </div>
          </div>

          <div
            className={`flex justify-center flex-col items-center mt-4 gap-4 ${
              !openWebcam && 'hidden'
            }`}
          >
            <BarcodeScannerComponent
              width="350px"
              height="350px"
              onUpdate={(err: any, result: any) => {
                if (result) {
                  setData(result?.text)
                } else {
                  setData('')
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
          </div>
        </div>
      </div>

      {toggle && <Blur onClick={() => dispatch(setToggle(false))}></Blur>}
      {toggle && <ChangePassword onClick={() => dispatch(setToggle(false))}></ChangePassword>}
    </>
  )
}

SetUpQR.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
}
