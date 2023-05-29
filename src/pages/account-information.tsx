export default function AccountInhtmlFormation() {
  return (
    <div className="bg-white">
      <div className="text-lg font-semibold text-black p-2 tracking-wider">
        Account Information <hr />
      </div>

      <div className="max-w-2xl flex items-center flex-col">
        <div>
          <div className="p-2">Account Information - ID User:</div>
          <ul className="p-4">
            <li className="flex w-full justify-between">
              <span>Tên tài khoản</span>
              <span>Minh Trang</span>
            </li>
            <li>
              <span></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
