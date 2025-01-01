import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useSearchContext } from '@/hooks/useSearchContext';

export function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearchContext();

  return (
    <div className="relative w-64">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search boards and links..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-8"
      />
    </div>
  );
}