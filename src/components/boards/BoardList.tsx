import { Board } from '@/types';
import { BoardCard } from '@/components/boards/BoardCard';
import { useBoardFilters } from '@/hooks/useBoardFilters';

interface BoardListProps {
  boards: Board[];
}

export function BoardList({ boards }: BoardListProps) {
  const { filteredBoards } = useBoardFilters(boards);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredBoards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
}