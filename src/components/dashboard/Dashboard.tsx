import { Header } from '@/components/dashboard/Header';
import { BoardList } from '@/components/boards/BoardList';
import { useBoards } from '@/hooks/useBoards';
import { Loader2 } from 'lucide-react';

export function Dashboard() {
  const { boards, loading } = useBoards();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {boards.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No boards yet</h2>
            <p className="text-muted-foreground">Create your first board to get started!</p>
          </div>
        ) : (
          <BoardList boards={boards} />
        )}
      </main>
    </div>
  );
}