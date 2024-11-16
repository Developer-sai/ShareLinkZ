// frontend/components/home-page.js
'use client'

import { useState, useEffect } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Plus, Share2, Trash2, User, Edit2 } from 'lucide-react'
import { useAuth } from '../app/page'
import * as api from '../services/api'
import { useToast } from '../hooks/use-toast'

export default function HomePage() {
  const [boards, setBoards] = useState([])
  const [newBoard, setNewBoard] = useState({ name: '', description: '' })
  const [newLink, setNewLink] = useState({ url: '', description: '', deadline: '' })
  const [editingBoard, setEditingBoard] = useState(null)
  const [editingLink, setEditingLink] = useState(null)
  const { user, logout } = useAuth()
  const { toast } = useToast()

  // ... rest of the component code remains the same
}

  useEffect(() => {
    fetchBoards()
  }, [])

  const fetchBoards = async () => {
    try {
      const { data } = await api.getBoards()
      setBoards(data)
    } catch (error) {
      console.error('Error fetching boards:', error)
      toast({
        title: "Error",
        description: "Failed to fetch boards. Please try again.",
        variant: "destructive",
      })
    }
  }

  const createBoard = async () => {
    try {
      await api.createBoard(newBoard)
      setNewBoard({ name: '', description: '' })
      fetchBoards()
      toast({
        title: "Success",
        description: "Board created successfully.",
      })
    } catch (error) {
      console.error('Error creating board:', error)
      toast({
        title: "Error",
        description: "Failed to create board. Please try again.",
        variant: "destructive",
      })
    }
  }

  const updateBoard = async () => {
    if (editingBoard) {
      try {
        await api.updateBoard(editingBoard.originalBoard._id, editingBoard.editedBoard)
        setEditingBoard(null)
        fetchBoards()
        toast({
          title: "Success",
          description: "Board updated successfully.",
        })
      } catch (error) {
        console.error('Error updating board:', error)
        toast({
          title: "Error",
          description: "Failed to update board. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const deleteBoard = async (boardToDelete) => {
    try {
      await api.deleteBoard(boardToDelete._id)
      fetchBoards()
      toast({
        title: "Success",
        description: "Board deleted successfully.",
      })
    } catch (error) {
      console.error('Error deleting board:', error)
      toast({
        title: "Error",
        description: "Failed to delete board. Please try again.",
        variant: "destructive",
      })
    }
  }

  const addLink = async (boardId) => {
    try {
      await api.addLink(boardId, newLink)
      setNewLink({ url: '', description: '', deadline: '' })
      fetchBoards()
      toast({
        title: "Success",
        description: "Link added successfully.",
      })
    } catch (error) {
      console.error('Error adding link:', error)
      toast({
        title: "Error",
        description: "Failed to add link. Please try again.",
        variant: "destructive",
      })
    }
  }

  const updateLink = async () => {
    if (editingLink) {
      try {
        await api.updateLink(editingLink.board._id, editingLink.originalLink._id, editingLink.editedLink)
        setEditingLink(null)
        fetchBoards()
        toast({
          title: "Success",
          description: "Link updated successfully.",
        })
      } catch (error) {
        console.error('Error updating link:', error)
        toast({
          title: "Error",
          description: "Failed to update link. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const deleteLink = async (boardId, linkId) => {
    try {
      await api.deleteLink(boardId, linkId)
      fetchBoards()
      toast({
        title: "Success",
        description: "Link deleted successfully.",
      })
    } catch (error) {
      console.error('Error deleting link:', error)
      toast({
        title: "Error",
        description: "Failed to delete link. Please try again.",
        variant: "destructive",
      })
    }
  }

  const toggleLinkVisited = async (boardId, linkId, visited) => {
    try {
      await api.updateLink(boardId, linkId, { visited: !visited })
      fetchBoards()
    } catch (error) {
      console.error('Error toggling link visited:', error)
      toast({
        title: "Error",
        description: "Failed to update link status. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ShareLinkZ</h1>
          <div className="text-center text-gray-700 dark:text-gray-300">Hi, {user.name}</div>
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
                <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <Card key={board._id} className="bg-white dark:bg-gray-800">
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
                    <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="ghost" size="icon">
      <Trash2 className="h-4 w-4" />
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure you want to delete this board?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the board and all its links.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() => deleteBoard(board)}>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

                  </div>
                </CardTitle>
                {board.description && <p className="text-sm text-gray-500 dark:text-gray-400">{board.description}</p>}
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {board.links.map((link) => (
                    <li key={link._id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={link.visited}
                          onCheckedChange={() => toggleLinkVisited(board._id, link._id, link.visited)}
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
                        <Button variant="ghost" size="icon" onClick={() => deleteLink(board._id, link._id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <form onSubmit={(e) => { e.preventDefault(); addLink(board._id); }} className="space-y-2 w-full">
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
