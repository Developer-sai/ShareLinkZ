import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLinks } from '@/hooks/useLinks';
import { isValidUrl } from '@/utils/validation';

interface AddLinkFormProps {
  boardId: string;
}

export function AddLinkForm({ boardId }: AddLinkFormProps) {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const { createLink } = useLinks(boardId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidUrl(url)) return;

    await createLink(url, description);
    setUrl('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 w-full">
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter link URL"
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter link description (optional)"
      />
      <Button type="submit" className="w-full">Add Link</Button>
    </form>
  );
}