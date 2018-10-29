export interface Payment {
  date: Date,
  title: string;
  description: string;
  amount: string;
  account: string;
  paid: boolean;
}

export interface MenuItem {
  title: string;
  url: string;
  icon: string;
  type: string;
}

export interface Company {
  cover?: string;
  id: string;
  logo?: string;
  title: string;
}

export interface Companies{
  own?:Company[],
  client?:Company[],
  list?:Company[],
}

export interface AuthResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user_id: string;
  user_name: string;
}

export interface NavigationItem{
  color: string;
  description: string;
  icon: string;
  title: string;
  url: string;
  width: number;
}

export interface Content{
  color?: string;
  title?: string;
  value?: string;
  width?: number;
  thead?: any;
  tbody?: any;
  content?:any;
  type?:string;
}
export interface ContentContainer{
  content: Content;
  is_default_open: boolean;
  title: string;
  type: string;
  width: number;
}


export interface UploadForm{
  content: UploadContent;
  is_default_open: boolean;
  title: string;
  type: string;
  width: number;
}

export interface UploadContent{
  fields:{
    title:string;
    type:string;
    name?:string;
    values:{
      text:string;
      value:number;
    }[]
  }[],
  "action-url":string;
}

export interface Thread {
  id?: number;
  subject: string;
  author: User;
  recipients: User[];
  messages: Message[];
  timestamp: number;
  closed:boolean;
  important:boolean;
}

export interface User {
  token_type?: string;
  access_token?: string;
  expires_in?: number;
  refresh_token?: string;
  user_id: string;
  user_name: string;
}

export interface Message {
  sender: User;
  message: string;
  timestamp: number;
}
