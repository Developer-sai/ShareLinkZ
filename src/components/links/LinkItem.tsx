import { Link } from '@/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit2, Trash2 } from 'lucide-react';
import { useLinks } from '@/hooks/useLinks';
import { formatDate } from '@/utils/date';

interface LinkItemProps {
  boardId: string;
  link: Link;
}

export function LinkItem({ boardId, link }: LinkItemProps) {
  const { toggleVisited, deleteLink } = useLinks(boardId);

  return (
    <li className="flex items-center justify-between group">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={link.visited}
          onCheckedChange={() => toggleVisited(link.id, !link.visited)}
        />
        <div>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-blue-600 dark:text-blue-400 hover:underline ${
              link.visited ? 'line-through' : ''
            }`}
          >
            {link.url}
          </a>
          {link.description && (
            <p className="text-sm text-muted-foreground">{link.description}</p>
          )}
          {link.deadline && (
            <p className="text-xs text-orange-500">
              Deadline: {formatDate(link.deadline)}
            </p>
          )}
        </div>
      </div>
      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon">
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => deleteLink(link.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </li>
  );
}