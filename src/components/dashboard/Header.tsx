import { UserMenu } from '@/components/dashboard/UserMenu';
import { ThemeToggle } from '@/components/dashboard/ThemeToggle';
import { SearchBar } from '@/components/dashboard/SearchBar';
import { CreateBoardButton } from '@/components/boards/CreateBoardButton';

export function Header() {
  return (
    <header className="bg-card shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">ShareLinkZ</h1>
        <div className="flex items-center space-x-4">
          <SearchBar />
          <CreateBoardButton />
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}