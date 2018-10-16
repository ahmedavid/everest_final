export interface AuthResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user_id: string;
  user_name: string;
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

export interface MenuItem {
  title: string;
  url: string;
  icon: string;
  type: string;
}

export interface NavigationItem{
  color: string;
  description: string;
  icon: string;
  title: string;
  url: string;
  width: number;
}
