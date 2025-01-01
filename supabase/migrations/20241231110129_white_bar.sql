/*
  # Initial ShareLinkZ Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `boards`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `type` (text)
      - `user_id` (uuid, references profiles)
      - `created_at` (timestamp)
      - `expires_at` (timestamp)

    - `links`
      - `id` (uuid, primary key)
      - `board_id` (uuid, references boards)
      - `url` (text)
      - `description` (text)
      - `visited` (boolean)
      - `deadline` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create boards table
CREATE TABLE boards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  type text NOT NULL CHECK (type IN ('saved', 'instant')),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  CONSTRAINT valid_expires_at CHECK (
    (type = 'instant' AND expires_at IS NOT NULL) OR
    (type = 'saved' AND expires_at IS NULL)
  )
);

-- Create links table
CREATE TABLE links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id uuid REFERENCES boards(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  description text,
  visited boolean DEFAULT false,
  deadline timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Boards policies
CREATE POLICY "Users can view their own boards"
  ON boards FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create boards"
  ON boards FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own boards"
  ON boards FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own boards"
  ON boards FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Links policies
CREATE POLICY "Users can view links in their boards"
  ON links FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM boards
      WHERE boards.id = links.board_id
      AND boards.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create links in their boards"
  ON links FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM boards
      WHERE boards.id = board_id
      AND boards.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update links in their boards"
  ON links FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM boards
      WHERE boards.id = links.board_id
      AND boards.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete links in their boards"
  ON links FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM boards
      WHERE boards.id = links.board_id
      AND boards.user_id = auth.uid()
    )
  );

-- Function to handle instant board expiration
CREATE OR REPLACE FUNCTION set_instant_board_expiry()
RETURNS trigger AS $$
BEGIN
  IF NEW.type = 'instant' THEN
    NEW.expires_at := NEW.created_at + interval '24 hours';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for instant board expiration
CREATE TRIGGER set_instant_board_expiry_trigger
  BEFORE INSERT ON boards
  FOR EACH ROW
  EXECUTE FUNCTION set_instant_board_expiry();