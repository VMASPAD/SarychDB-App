import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Database, Plus, Search, Loader2, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router"
import { createDB, listDatabases, getStoredCredentials } from "@/lib/operations"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

function DataBases() {
    const [dataInformation, setDataInformation] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredDatabases, setFilteredDatabases] = useState<any[]>([])
    const [newDatabaseName, setNewDatabaseName] = useState("")
    const navigate = useNavigate()

    const handleRedirect = useCallback((dbName: string) => {
        navigate(`/view/${dbName}`)
    }, [navigate])

    useEffect(() => {
        async function initializeData() {
            const credentials = getStoredCredentials();
            if (!credentials) {
                window.location.href = "/";
                return;
            }
            
            try {
                const result = await listDatabases(credentials);
                const databases = result?.databases || [];
                setDataInformation(databases);
                setFilteredDatabases(databases);
            } catch (error) {
                console.error("Error loading databases:", error);
                setDataInformation([]);
                setFilteredDatabases([]);
            } finally {
                setIsLoading(false);
            }
        }

        initializeData();
    }, [])
    const handleCreateDatabase = useCallback(async (dbName: string) => {
        const credentials = getStoredCredentials();
        if (!credentials) {
            window.location.href = "/";
            return;
        }
        
        try {
            await createDB({ ...credentials, dbName });
            toast.success("Database created successfully");
            
            // Reload databases list
            const result = await listDatabases(credentials);
            const databases = result?.databases || [];
            setDataInformation(databases);
            setFilteredDatabases(databases);
            setNewDatabaseName("");
        } catch (error) {
            toast.error("Error creating database");
            console.error(error);
        }
    }, []);
    
    // Memoize filtered databases
    const displayDatabases = useMemo(() => {
        if (searchQuery) {
            return dataInformation.filter((db) =>
                db.namedb.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return dataInformation;
    }, [searchQuery, dataInformation]);
    
    // Update filtered databases when displayDatabases changes
    useEffect(() => {
        setFilteredDatabases(displayDatabases);
    }, [displayDatabases]);
    if (isLoading) {
        return (
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='flex min-h-screen items-center justify-center bg-transparent px-6'
            >
                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Loader2 className="h-12 w-12 text-primary" />
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground"
                    >
                        Loading your databases...
                    </motion.p>
                </div>
            </motion.section>
        )
    }

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='flex min-h-screen items-start justify-center bg-transparent px-6 py-12'
        >
            <div className="w-full max-w-7xl space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-3"
                >
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground">Databases</h1>
                    <p className="text-muted-foreground text-sm">
                        Manage and access your database collections
                    </p>
                </motion.div>

                {/* Search and Actions */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-between gap-4"
                >
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search databases..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-10 border-border/50 focus-visible:ring-1"
                        />
                    </div>
                    <Badge className="flex items-center gap-2 text-sm text-muted">
                        <span className="font-medium">{filteredDatabases.length}</span>
                        <span>{filteredDatabases.length === 1 ? 'database' : 'databases'}</span>
                    </Badge>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="gap-2 h-10" variant="default">
                                <Plus className="h-4 w-4" />
                                New Database
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Database</DialogTitle>
                                <DialogDescription>
                                    Enter a name for your new database. The name should be unique and descriptive.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-2 py-4">
                                <Label htmlFor="dbname">Database Name</Label>
                                <Input 
                                    id="dbname"
                                    type="text" 
                                    placeholder="my-database" 
                                    value={newDatabaseName} 
                                    onChange={(e) => setNewDatabaseName(e.target.value)} 
                                />
                            </div>
                            <DialogFooter>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogTrigger>
                                <Button onClick={() => handleCreateDatabase(newDatabaseName)} disabled={!newDatabaseName.trim()}>
                                    Create Database
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </motion.div>

                {/* Database Grid */}
                {filteredDatabases.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredDatabases.map((db, index) => (
                                <motion.div
                                    key={db.namedb || index}
                                    initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
                                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                                    exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.95 }}
                                    transition={{ delay: index * 0.03, duration: 0.3 }}
                                    layout
                                >
                                    <Card 
                                        className="relative overflow-hidden border border-border/40 hover:border-border transition-all duration-300 cursor-pointer group bg-card/50 backdrop-blur-sm"
                                        onClick={() => handleRedirect(db.namedb)}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                                                        <Database className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-base font-medium group-hover:text-primary transition-colors">
                                                            {db.namedb || 'Unknown Database'}
                                                        </CardTitle>
                                                        <p className="text-xs text-muted-foreground mt-0.5">Database</p>
                                                    </div>
                                                </div>
                                                <motion.div
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                    initial={{ x: -5 }}
                                                    whileHover={{ x: 0 }}
                                                >
                                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                                </motion.div>
                                            </div>
                                        </CardHeader>
                                        
                                        <CardContent className="pt-0">
                                            <div className="flex items-center justify-between py-2 border-t border-border/40">
                                                <span className="text-xs text-muted-foreground">Status</span>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                                    <span className="text-xs font-medium text-green-600 dark:text-green-400">Active</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-20 space-y-4 rounded-lg border border-dashed border-border/50"
                    >
                        <div className="p-4 rounded-full bg-muted/50">
                            <Database className="h-8 w-8 text-muted-foreground/70" />
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-base font-medium text-foreground">
                                {searchQuery ? 'No databases found' : 'No databases yet'}
                            </p>
                            <p className="text-sm text-muted-foreground max-w-sm">
                                {searchQuery 
                                    ? 'Try adjusting your search criteria' 
                                    : 'Create your first database to get started'}
                            </p>
                        </div>
                        {searchQuery ? (
                            <Button variant="outline" onClick={() => setSearchQuery("")} className="mt-2">
                                Clear search
                            </Button>
                        ) : (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="gap-2 mt-2">
                                        <Plus className="h-4 w-4" />
                                        Create Database
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Create New Database</DialogTitle>
                                        <DialogDescription>
                                            Enter a name for your new database. The name should be unique and descriptive.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-2 py-4">
                                        <Label htmlFor="dbname-empty">Database Name</Label>
                                        <Input 
                                            id="dbname-empty"
                                            type="text" 
                                            placeholder="my-database" 
                                            value={newDatabaseName} 
                                            onChange={(e) => setNewDatabaseName(e.target.value)} 
                                        />
                                    </div>
                                    <DialogFooter>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogTrigger>
                                        <Button onClick={() => handleCreateDatabase(newDatabaseName)} disabled={!newDatabaseName.trim()}>
                                            Create Database
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}
                    </motion.div>
                )}
            </div>
        </motion.section>
    )
}

export default DataBases
