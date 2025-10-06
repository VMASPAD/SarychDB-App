import { AnimatedThemeToggler } from './ui/animated-theme-toggler'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CircleQuestionMark, LogOut } from 'lucide-react'
import { Button } from './ui/button'
function NavBar() {
  const handleLogout = () => {
    localStorage.removeItem("isLoged");
    localStorage.removeItem("userServer");
    localStorage.removeItem("passwordServer");
    window.location.href = "/";
  }
  return (
    <nav className='w-full flex items-center justify-center p-4 z-20'>
      <div className='absolute gap-5 top-5 w-fit p-5 shadow-md rounded-full px-4 py-2 flex items-center justify-between bg-white dark:bg-gray-800'>
        <AnimatedThemeToggler />
        <Dialog>
          <DialogTrigger><LogOut /></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log Out</DialogTitle>
              <DialogDescription>
                Are you sure you want to log out? 
                Your credentials will be removed and you will need to log in again.
              </DialogDescription>
            </DialogHeader>
          <DialogFooter>
            <Button variant={'destructive'} onClick={handleLogout}>Log Out</Button>
          </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger><CircleQuestionMark className='text-sidebar-ring' /></DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>📚 Quick Guide - SarychDB Manager</DialogTitle>
              <DialogDescription className="text-left space-y-4 pt-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground text-base">🏠 Main Screen</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>View databases:</strong> Complete list of your databases</li>
                    <li><strong>Search:</strong> Use the search bar to filter</li>
                    <li><strong>Create:</strong> Click "+ Create Database" for new DB</li>
                    <li><strong>Access:</strong> Click any card to view content</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground text-base">📊 Data View</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Statistics:</strong> Total records and size at the top</li>
                    <li><strong>Search:</strong> Filter documents in real-time</li>
                    <li><strong>Pagination:</strong> Navigate with ◀️ ▶️ and adjust limit</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground text-base">✏️ CRUD Operations</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>➕ Create:</strong> "Add Document" button → JSON Editor → Insert</li>
                    <li><strong>📋 Copy:</strong> Copy icon for JSON to clipboard</li>
                    <li><strong>✏️ Edit:</strong> Blue pencil icon → Modify JSON → Update</li>
                    <li><strong>🗑️ Delete:</strong> Red trash icon → Confirm → Delete</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground text-base">💡 Tips</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>JSON must be valid when inserting/editing</li>
                    <li>Deletions are permanent</li>
                    <li>Use limits of 50-100 docs for better performance</li>
                    <li>Search is case-insensitive</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground text-base">🔐 Security</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Log out when finished (🚪 icon)</li>
                    <li>Credentials stored locally in your browser</li>
                    <li>Use 🌓 to switch between light/dark mode</li>
                  </ul>
                </div>

                <div className="pt-2 border-t text-xs text-muted-foreground">
                  For more information, check the <code className="bg-muted px-1 rounded">USER_GUIDE.md</code> file in the project folder.
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  )
}

export default NavBar 
