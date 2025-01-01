import { Link } from '@/types';
import { LinkItem } from '@/components/links/LinkItem';

interface LinkListProps {
  boardId: string;
  links: Link[];
}

export function LinkList({ boardId, links }: LinkListProps) {
  return (
    <ul className="space-y-2">
      {links.map((link) => (
        <LinkItem key={link.id} boardId={boardId} link={link} />
      ))}
    </ul>
  );
}