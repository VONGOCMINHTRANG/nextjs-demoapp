import { IoLogoMicrosoft } from 'react-icons/io5'
import { RiWallet3Fill } from 'react-icons/ri'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { TbPageBreak } from 'react-icons/tb'
import { BiLink } from 'react-icons/bi'
import {
  BsFillPostageFill,
  BsFillMenuButtonFill,
  BsFillBarChartFill,
  BsFillPersonFill,
} from 'react-icons/bs'
import {
  MdSubscriptions,
  MdOutlineQrCodeScanner,
  MdOutlinePageview,
  MdMarkEmailUnread,
} from 'react-icons/md'
import { GiReceiveMoney } from 'react-icons/gi'
import { AiOutlineFieldTime, AiTwotoneSetting } from 'react-icons/ai'

export default function Sidebar() {
  return (
    <div className="text-sm font-semibold w-80 bg-white text-black/70 p-4 font-sans shadow-2xl">
      <div className="p-1">
        <ul>
          <li className="flex items-center gap-4 hover:text-green-500 cursor-pointer hover:bg-gray-100 hover:rounded-md p-2 mb-0.5">
            <IoLogoMicrosoft />
            <span>Dashboard</span>
          </li>
          <li className="flex items-center gap-4 hover:text-green-500 cursor-pointer hover:bg-gray-100 hover:rounded-md p-2 mb-0.5">
            <RiWallet3Fill />
            <span>Quản lý số dư</span>
          </li>
          <hr />
          <li className="flex items-center gap-4 hover:text-green-500 cursor-pointer hover:bg-gray-100 hover:rounded-md p-2 mb-0.5">
            <FaRegMoneyBillAlt />
            <span>Thanh toán mới</span>
          </li>
          <hr />
        </ul>

        <h3 className="py-2.5 text-gray-500">NHẬN THANH TOÁN</h3>
        <ul>
          <li className="flex items-center gap-4 hover:text-green-500 cursor-pointer hover:bg-gray-100 hover:rounded-md p-2 mb-0.5">
            <TbPageBreak />
            <span>PayME Page</span>
          </li>
          <li className="flex items-center gap-4 hover:text-green-500 cursor-pointer hover:bg-gray-100 hover:rounded-md p-2 mb-0.5">
            <BiLink />
            <span>PayME Link</span>
          </li>
          <li className="flex items-center gap-4 hover:text-green-500 cursor-pointer hover:bg-gray-100 hover:rounded-md p-2 mb-0.5">
            <BsFillPostageFill />
            <span>PayME POS</span>
          </li>
          <li className="flex items-center gap-4 hover:text-green-500 cursor-pointer hover:bg-gray-100 hover:rounded-md p-2 mb-0.5">
            <BsFillMenuButtonFill />
            <span>PayME Button</span>
          </li>
          <li className="flex items-center gap-4 hover:text-green-500 cursor-pointer hover:bg-gray-100 hover:rounded-md p-2 mb-0.5">
            <MdSubscriptions />
            <span>PayME Subscription</span>
          </li>
          <li className="flex items-center gap-4 hover:text-green-500 cursor-pointer hover:bg-gray-100 hover:rounded-md p-2 mb-0.5">
            <MdOutlineQrCodeScanner />
            <span>Mã QR</span>
          </li>
        </ul>

        <h3 className="py-2.5 text-gray-500">CHUYỂN TIỀN/THANH TOÁN</h3>
        <ul>
          <li className="flex items-center gap-4 hover:text-green-500 cursor-pointer hover:bg-gray-100 hover:rounded-md p-2 mb-0.5">
            <GiReceiveMoney />
            <span>Payout</span>
          </li>
        </ul>

        <h3 className="py-2.5 text-gray-500">QUẢN LÝ GIAO DỊCH</h3>
        <ul>
          <li className="flex items-center gap-4 hover:text-green-500 cursor-pointer hover:bg-gray-100 hover:rounded-md p-2 mb-0.5">
            <AiOutlineFieldTime />
            <span>Danh sách giao dịch</span>
          </li>
          <li className="flex items-center gap-4 hover:text-green-500 cursor-pointer hover:bg-gray-100 hover:rounded-md p-2 mb-0.5">
            <BsFillPersonFill />
            <span>Khách hàng</span>
          </li>
          <li className="flex items-center gap-4 hover:text-green-500 cursor-pointer hover:bg-gray-100 hover:rounded-md p-2 mb-0.5">
            <BsFillBarChartFill />
            <span>Thống kê</span>
          </li>
          <li className="flex items-center gap-4 hover:text-green-500 cursor-pointer hover:bg-gray-100 hover:rounded-md p-2 mb-0.5">
            <MdOutlinePageview />
            <span>Đối soát</span>
          </li>
          <li className="flex items-center gap-4 hover:text-green-500 cursor-pointer hover:bg-gray-100 hover:rounded-md p-2 mb-0.5">
            <MdMarkEmailUnread />
            <span>Email/SMS</span>
          </li>
        </ul>

        <h3 className="py-2.5 text-gray-500">CÀI ĐẶT</h3>
        <ul>
          <li className="flex items-center gap-4 hover:text-green-500 cursor-pointer hover:bg-gray-100 hover:rounded-md p-2 mb-0.5">
            <AiTwotoneSetting />
            <span>Cài đặt</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
