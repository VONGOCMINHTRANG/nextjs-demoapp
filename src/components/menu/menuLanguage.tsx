import Image from 'next/image'
import VietNamImage from '../../../assets/images/vietnam.avif'
import EnglishImage from '../../../assets/images/english.avif'

export default function MenuLanguage() {
  return (
    <div className="absolute bg-white right-12 mx-8 shadow-md mt-5 rounded-md">
      <ul className="p-2 text-base text-gray-500 font-semibold px-5">
        <li className="flex items-center gap-4 cursor-pointer hover:bg-green-50 hover:rounded-md p-2.5">
          <Image src={VietNamImage} alt="" className="w-5 h-5 rounded-full cursor-pointer" />
          <span>Tiếng Việt</span>
        </li>
        <li className="flex items-center gap-4 cursor-pointer hover:bg-green-50 hover:rounded-md p-2.5">
          <Image src={EnglishImage} alt="" className="w-5 h-5 rounded-full cursor-pointer" />
          <span>English</span>
        </li>
      </ul>
    </div>
  )
}
