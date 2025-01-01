export interface Board {
  id: string;
  name: string;
  description: string | null;
  type: 'saved' | 'instant';
  user_id: string;
  created_at: string;
  expires_at: string | null;
  links?: Link[];
}

export interface Link {
  id: string;
  board_id: string;
  url: string;
  description: string | null;
  visited: boolean;
  deadline: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  username: string;
  created_at: string;
  updated_at: string;
}