interface SessionPayload {
  sub: string;
  email: string;
  role: string;
  session_id: string;
}

interface UserProfile {
  user_id: string;
  email: string;
  role: string;
  created_at: string;
}

interface User {
  id: string;
  email: string;
  role: string;
  created_at: Date;
}

interface Notification {
  id: string;
  type: string;
  body: string;
  created_at: Date;
}
