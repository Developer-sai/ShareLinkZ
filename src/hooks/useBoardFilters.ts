import { useState, useMemo } from 'react';
import { Board } from '@/types';

export function useBoardFilters(boards: Board[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [boardType, setBoardType] = useState<'saved' | 'instant'>('saved');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredBoards = useMemo(() => {
    return boards
      .filter(board => 
        board.type === boardType &&
        (board.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         board.links?.some(link => 
           link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
           link.description?.toLowerCase().includes(searchTerm.toLowerCase())
         ))
      )
      .sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
  }, [boards, searchTerm, boardType, sortOrder]);

  return {
    filteredBoards,
    searchTerm,
    setSearchTerm,
    boardType,
    setBoardType,
    sortOrder,
    setSortOrder
  };
}