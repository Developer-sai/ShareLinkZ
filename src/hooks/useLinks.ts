import { supabase } from '@/lib/supabase';
import { Link } from '@/types';

export function useLinks(boardId: string) {
  const createLink = async (url: string, description?: string, deadline?: string) => {
    try {
      const { data, error } = await supabase
        .from('links')
        .insert([{
          board_id: boardId,
          url,
          description,
          deadline: deadline ? new Date(deadline).toISOString() : null
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating link:', error);
      throw error;
    }
  };

  const updateLink = async (id: string, updates: Partial<Link>) => {
    try {
      const { data, error } = await supabase
        .from('links')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating link:', error);
      throw error;
    }
  };

  const deleteLink = async (id: string) => {
    try {
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting link:', error);
      throw error;
    }
  };

  const toggleVisited = async (id: string, visited: boolean) => {
    return updateLink(id, { visited });
  };

  return {
    createLink,
    updateLink,
    deleteLink,
    toggleVisited
  };
}