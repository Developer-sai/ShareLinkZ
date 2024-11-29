'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Share2, Trash2, User, Edit2 } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

export default function HomePage() {
  const [boards, setBoards] = useState([])
  const [newBoard, setNewBoard] = useState({ name: '', description: '' })
  const [newLink, setNewLink] = useState({ url: '', description: '', deadline: '' })
  const [editingBoard, setEditingBoard] = useState(null)
  const [editingLink, setEditingLink] = useState(null)

  useEffect(() => {
    const savedBoards = Object.keys(localStorage)
      .filter(key => key.startsWith('board_'))
      .map(key => JSON.parse(localStorage.getItem(key)))
    setBoards(savedBoards)
  }, [])

  const saveBoard = (board) => {
    localStorage.setItem(`board_${board.id}`, JSON.stringify(board))
  }

  const deleteBoard = (boardId) => {
    localStorage.removeItem(`board_${boardId}`)
    setBoards(boards.filter(board => board.id !== boardId))
  }

  const createBoard = () => {
    if (newBoard.name) {
      const board = { ...newBoard, id: uuidv4(), links: [] }
      setBoards([...boards, board])
      saveBoard(board)
      setNewBoard({ name: '', description: '' })
    }
  }

  const updateBoard = () => {
    if (editingBoard) {
      const updatedBoards = boards.map(board => 
        board.id === editingBoard.originalBoard.id ? editingBoard.editedBoard : board
      )
      setBoards(updatedBoards)
      saveBoard(editingBoard.editedBoard)
      setEditingBoard(null)
    }
  }

  const addLink = (boardId) => {
    if (newLink.url) {
      const updatedBoards = boards.map(board => {
        if (board.id === boardId) {
          const updatedBoard = {
            ...board,
            links: [...board.links, { ...newLink, id: uuidv4(), visited: false }]
          }
          saveBoard(updatedBoard)
          return updatedBoard
        }
        return board
      })
      setBoards(updatedBoards)
      setNewLink({ url: '', description: '', deadline: '' })
    }
  }

  const updateLink = () => {
    if (editingLink) {
      const updatedBoards = boards.map(board => {
        if (board.id === editingLink.board.id) {
          const updatedLinks = board.links.map(link => 
            link.id === editingLink.originalLink.id ? editingLink.editedLink : link
          )
          const updatedBoard = { ...board, links: updatedLinks }
          saveBoard(updatedBoard)
          return updatedBoard
        }
        return board
      })
      setBoards(updatedBoards)
      setEditingLink(null)
    }
  }

  const deleteLink = (boardId, linkId) => {
    const updatedBoards = boards.map(board => {
      if (board.id === boardId) {
        const updatedBoard = {
          ...board,
          links: board.links.filter(link => link.id !== linkId)
        }
        saveBoard(updatedBoard)
        return updatedBoard
      }
      return board
    })
    setBoards(updatedBoards)
  }

  const toggleLinkVisited = (boardId, linkId) => {
    const updatedBoards = boards.map(board => {
      if (board.id === boardId) {
        const updatedLinks = board.links.map(link => 
          link.id === linkId ? { ...link, visited: !link.visited } : link
        )
        const updatedBoard = { ...board, links: updatedLinks }
        saveBoard(updatedBoard)
        return updatedBoard
      }
      return board
    })
    setBoards(updatedBoards)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ShareLinkZ</h1>
          <div className="text-center text-gray-700 dark:text-gray-300">Hi, UserName</div>
          <div className="flex items-center space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline"><Plus className="mr-2 h-4 w-4" /> Create Board</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Board</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="board-name">Board Name</Label>
                    <Input
                      id="board-name"
                      value={newBoard.name}
                      onChange={(e) => setNewBoard({ ...newBoard, name: e.target.value })}
                      placeholder="Enter board name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="board-description">Description (Optional)</Label>
                    <Textarea
                      id="board-description"
                      value={newBoard.description}
                      onChange={(e) => setNewBoard({ ...newBoard, description: e.target.value })}
                      placeholder="Enter board description"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={createBoard}>Create Board</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Account Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <Card key={board.id} className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {board.name}
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Board</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-board-name">Board Name</Label>
                            <Input
                              id="edit-board-name"
                              value={editingBoard?.editedBoard.name || board.name}
                              onChange={(e) => setEditingBoard({
                                originalBoard: board,
                                editedBoard: { ...editingBoard?.editedBoard || board, name: e.target.value }
                              })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-board-description">Description</Label>
                            <Textarea
                              id="edit-board-description"
                              value={editingBoard?.editedBoard.description || board.description}
                              onChange={(e) => setEditingBoard({
                                originalBoard: board,
                                editedBoard: { ...editingBoard?.editedBoard || board, description: e.target.value }
                              })}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={updateBoard}>Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteBoard(board.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                {board.description && <p className="text-sm text-gray-500 dark:text-gray-400">{board.description}</p>}
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {board.links.map((link) => (
                    <li key={link.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={link.visited}
                          onCheckedChange={() => toggleLinkVisited(board.id, link.id)}
                        />
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-blue-600 dark:text-blue-400 hover:underline ${link.visited ? 'line-through' : ''}`}
                        >
                          {link.url}
                        </a>
                      </div>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Link</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="edit-link-url">URL</Label>
                                <Input
                                  id="edit-link-url"
                                  value={editingLink?.editedLink.url || link.url}
                                  onChange={(e) => setEditingLink({
                                    board: board,
                                    originalLink: link,
                                    editedLink: { ...editingLink?.editedLink || link, url: e.target.value }
                                  })}
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-link-description">Description</Label>
                                <Input
                                  id="edit-link-description"
                                  value={editingLink?.editedLink.description || link.description}
                                  onChange={(e) => setEditingLink({
                                    board: board,
                                    originalLink: link,
                                    editedLink: { ...editingLink?.editedLink || link, description: e.target.value }
                                  })}
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-link-deadline">Deadline</Label>
                                <Input
                                  id="edit-link-deadline"
                                  type="datetime-local"
                                  value={editingLink?.editedLink.deadline || link.deadline}
                                  onChange={(e) => setEditingLink({
                                    board: board,
                                    originalLink: link,
                                    editedLink: { ...editingLink?.editedLink || link, deadline: e.target.value }
                                  })}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={updateLink}>Save Changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="icon" onClick={() => deleteLink(board.id, link.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <form onSubmit={(e) => { e.preventDefault(); addLink(board.id); }} className="space-y-2 w-full">
                  <Input
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    placeholder="Enter link URL"
                  />
                  <Input
                    value={newLink.description}
                    onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                    placeholder="Enter link description (optional)"
                  />
                  <Input
                    type="datetime-local"
                    value={newLink.deadline}
                    onChange={(e) => setNewLink({ ...newLink, deadline: e.target.value })}
                  />
                  <Button type="submit" className="w-full">Add Link</Button>
                </form>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

