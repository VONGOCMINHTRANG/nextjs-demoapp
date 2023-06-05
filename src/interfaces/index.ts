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

interface IUser {
  email: string
  token: string
  userId: string
}
interface IAuthState {
  isLoggedIn: boolean
  loadingLogging?: boolean
  currentUser?: IUser
}

interface ISidebarState {
  sidebarState: boolean
}

interface IToggleState {
  toggleState: boolean
}

interface ILoginPayload {
  email: string
  password: string
}

export type {
  IChangePW,
  IBlur,
  IAccountInformation,
  ISidebar,
  IScanQR,
  IUser,
  IAuthState,
  ISidebarState,
  IToggleState,
  ILoginPayload,
}
