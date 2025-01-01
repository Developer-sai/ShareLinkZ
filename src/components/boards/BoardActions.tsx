import { useState } from 'react';
import { Board } from '@/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Share2, Edit2, Trash2 } from 'lucide-react';
import { useBoards } from '@/hooks/useBoards';

interface BoardActionsProps {
  board: Board;
}

export function BoardActions({ board }: BoardActionsProps) {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const { deleteBoard } = useBoards();

  const handleShare = () => {
    setShowShareDialog(true);
  };

  return (
    <div className="flex space-x-2">
      <Button variant="ghost" size="icon" onClick={handleShare}>
        <Share2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Edit2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => deleteBoard(board.id)}>
        <Trash2 className="h-4 w-4" />
      </Button>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Board</DialogTitle>
          </DialogHeader>
          {/* Share dialog content */}
        </DialogContent>
      </Dialog>
    </div>
  );
}