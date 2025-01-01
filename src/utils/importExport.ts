import { v4 as uuidv4 } from 'uuid';

interface Board {
  id: string;
  name: string;
  description: string;
  links: Link[];
  type: 'saved' | 'instant';
  createdAt: number;
}

interface Link {
  id: string;
  url: string;
  description: string;
  visited: boolean;
  createdAt: number;
  deadline?: string;
}

export function exportToJson(boards: Board[]): string {
  return JSON.stringify(boards, null, 2);
}

export function importFromJson(jsonString: string): Board[] {
  try {
    const boards = JSON.parse(jsonString) as Board[];
    return boards.map(board => ({
      ...board,
      id: uuidv4(), // Generate new IDs to avoid conflicts
      links: board.links.map(link => ({
        ...link,
        id: uuidv4(),
      })),
    }));
  } catch (error) {
    console.error('Error parsing JSON:', error);
    throw new Error('Invalid JSON format');
  }
}