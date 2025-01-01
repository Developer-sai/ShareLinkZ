import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useBoards } from '@/hooks/useBoards';
import { validateBoardName } from '@/utils/validation';

export function CreateBoardButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'saved' | 'instant'>('saved');
  const { createBoard } = useBoards();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateBoardName(name);
    if (error) return;

    await createBoard(name, description, type);
    setOpen(false);
    setName('');
    setDescription('');
    setType('saved');
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> Create Board
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Board</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter board name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter board description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Board Type</Label>
              <Select value={type} onValueChange={(value: 'saved' | 'instant') => setType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select board type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saved">Saved Board</SelectItem>
                  <SelectItem value="instant">Instant Board (24h)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">Create Board</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}