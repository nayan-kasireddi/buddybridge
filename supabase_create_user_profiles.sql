CREATE TABLE IF NOT EXISTS user_profiles (
  uid text PRIMARY KEY,
  role text NOT NULL,
  name text NOT NULL,
  location text,
  created_at timestamptz DEFAULT now()
);
