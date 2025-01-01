import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-muted-foreground" />
      <Switch checked={isDark} onCheckedChange={toggle} />
      <Moon className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}