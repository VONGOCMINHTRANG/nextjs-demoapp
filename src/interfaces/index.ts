interface IChangePW {
  onClick: any
}

interface IBlur {
  onClick: any
}

interface IAccountInformation {
  email: string
  fullname: string
  id: string
}

interface ISidebar {
  sidebar: boolean
}

interface IScanQR {
  stopStream: any
}

export type { IChangePW, IBlur, IAccountInformation, ISidebar, IScanQR }
