export interface LoginParams {
  phone: string;
  code: string;
}

export interface LoginByCodeParams {
  code: string;
}

export interface LoginResult {
  token: string;
  user_id: number;
  user_name: string;
  avatar: string;
}
