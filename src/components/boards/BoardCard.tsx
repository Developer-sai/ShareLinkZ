import { Board } from '@/types';
import { LinkList } from '@/components/links/LinkList';
import { AddLinkForm } from '@/components/links/AddLinkForm';
import { BoardActions } from '@/components/boards/BoardActions';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

interface BoardCardProps {
  board: Board;
}

export function BoardCard({ board }: BoardCardProps) {
  return (
    <Card>
      <CardHeader className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">{board.name}</h2>
          {board.description && (
            <p className="text-sm text-muted-foreground">{board.description}</p>
          )}
        </div>
        <BoardActions board={board} />
      </CardHeader>
      <CardContent>
        <LinkList boardId={board.id} links={board.links || []} />
      </CardContent>
      <CardFooter>
        <AddLinkForm boardId={board.id} />
      </CardFooter>
    </Card>
  );
}