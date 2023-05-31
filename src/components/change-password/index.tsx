import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { GrClose } from 'react-icons/gr'
import { IChangePW } from '../../interfaces'

export default function ChangePassword({ onClick = () => {} }: IChangePW): any {
  const [portalDiv, setPortalDiv] = useState<Element | DocumentFragment | null>()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPortalDiv(document.querySelector('body'))
    }
  }, [])

  // console.log(portalDiv)

  if (portalDiv) {
    return createPortal(
      <div className="flex justify-center">
        <div className="bg-white w-96 rounded-xl absolute z-50 flex flex-col top-12 transition-all">
          <div className="p-4 flex items-center justify-between">
            <span className="text-lg font-medium text-black">Đổi mật khẩu</span>
            <GrClose onClick={onClick} className="w-4 h-4 cursor-pointer" />
          </div>

          <div className="py-2 px-6">
            <form>
              <div className="mb-4">
                <label htmlFor="oldPassword" className="text-sm">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="Nhập mật khẩu hiện tại"
                  className="p-2 text-base w-full mt-2 outline-none rounded-lg bg-[#e6ebf5]"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="text-sm">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Nhập mật khẩu mới"
                  className="p-2 text-base w-full mt-2 outline-none rounded-lg bg-[#e6ebf5]"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="retypePassword" className="text-sm">
                  Nhập lại mật khẩu mới
                </label>
                <input
                  type="password"
                  name="retypePassword"
                  placeholder="Nhập lại mật khẩu mới"
                  className="p-2 text-base w-full mt-2 outline-none rounded-lg bg-[#e6ebf5]"
                />
              </div>

              <button className="bg-green-500 hover:bg-green-600 text-white w-full rounded-xl p-3 font-medium mt-4 mb-8">
                Đổi mật khẩu
              </button>
            </form>
          </div>
        </div>
      </div>,
      portalDiv as Element | DocumentFragment
    )
  }
}
