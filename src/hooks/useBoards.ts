import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Board } from '@/types';

export function useBoards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const { data, error } = await supabase
        .from('boards')
        .select(`
          *,
          links (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBoards(data || []);
    } catch (error) {
      console.error('Error fetching boards:', error);
    } finally {
      setLoading(false);
    }
  };

  const createBoard = async (name: string, description: string, type: 'saved' | 'instant') => {
    try {
      const { data, error } = await supabase
        .from('boards')
        .insert([{ name, description, type }])
        .select()
        .single();

      if (error) throw error;
      setBoards([data, ...boards]);
      return data;
    } catch (error) {
      console.error('Error creating board:', error);
      throw error;
    }
  };

  const updateBoard = async (id: string, updates: Partial<Board>) => {
    try {
      const { data, error } = await supabase
        .from('boards')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setBoards(boards.map(board => board.id === id ? { ...board, ...data } : board));
      return data;
    } catch (error) {
      console.error('Error updating board:', error);
      throw error;
    }
  };

  const deleteBoard = async (id: string) => {
    try {
      const { error } = await supabase
        .from('boards')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBoards(boards.filter(board => board.id !== id));
    } catch (error) {
      console.error('Error deleting board:', error);
      throw error;
    }
  };

  return {
    boards,
    loading,
    createBoard,
    updateBoard,
    deleteBoard,
    refreshBoards: fetchBoards
  };
}