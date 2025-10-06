import { useState, useMemo, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronDown, Copy, Trash2, Loader2, ChevronLeft, ChevronRightIcon, Search, Plus, Edit } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { deleteDocuments, getStoredCredentials, insertDocument, updateDocumentById } from '@/lib/operations'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface ModelsProps {
  data: any;
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  onDataUpdate?: () => void;
  currentPage?: number;
  currentLimit?: number;
  dbName?: string;
}

function Models({ data, isLoading = false, onPageChange, onLimitChange, onDataUpdate, currentPage = 1, currentLimit = 100, dbName }: ModelsProps) {
  const records = useMemo(() => data?.data || [], [data]);
  const pagination = data?.pagination;
  const [limitInput, setLimitInput] = useState(currentLimit.toString());
  const [searchQuery, setSearchQuery] = useState('');
  const [showInsertDialog, setShowInsertDialog] = useState(false);
  const [insertData, setInsertData] = useState('{\n  \n}');
  const [isInserting, setIsInserting] = useState(false);

  const filteredRecords = useMemo(() => {
    if (searchQuery) {
      return records.filter((record: any) => 
        JSON.stringify(record).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return records;
  }, [searchQuery, records]);

  const handleLimitChange = () => {
    const newLimit = parseInt(limitInput);
    if (!isNaN(newLimit) && newLimit > 0 && newLimit <= 1000) {
      onLimitChange?.(newLimit);
    }
  };

  const handlePrevPage = () => {
    if (pagination?.has_prev && currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination?.has_next) {
      onPageChange?.(currentPage + 1);
    }
  };

  const handleInsertDocument = async () => {
    if (!dbName) {
      toast.error("Database name is required");
      return;
    }

    const credentials = getStoredCredentials();
    if (!credentials) {
      toast.error("No credentials found");
      return;
    }

    try {
      const documentData = JSON.parse(insertData);
      setIsInserting(true);

      await insertDocument({
        ...credentials,
        dbName,
        data: documentData
      });

      toast.success("Document inserted successfully");
      setShowInsertDialog(false);
      setInsertData('{\n  \n}');
      onDataUpdate?.();
    } catch (error) {
      console.error("Error inserting document:", error);
      if (error instanceof SyntaxError) {
        toast.error("Invalid JSON format");
      } else {
        toast.error("Failed to insert document");
      }
    } finally {
      setIsInserting(false);
    }
  };
  
  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-64 text-muted-foreground gap-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-8 w-8" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Loading documents...
        </motion.p>
      </motion.div>
    );
  }
  
  if (!records || records.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center h-64 text-muted-foreground"
      >
        <p>No data available</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">

      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between flex-wrap gap-3 p-3 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50"
      >
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search in documents..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9" />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {searchQuery && (
              <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="px-2 py-1 bg-primary/10 rounded-md">
                Found: {filteredRecords.length}
              </motion.span>
            )}
            <span>{filteredRecords.length} of {pagination?.total_records || records.length} documents</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowInsertDialog(true)}
            size="sm"
            className="h-8 gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Document
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Limit:</span>
            <Input type="number" value={limitInput} onChange={(e) => setLimitInput(e.target.value)} onBlur={handleLimitChange} onKeyDown={(e) => e.key === 'Enter' && handleLimitChange()} className="w-20 h-8" min="1" max="1000" />
          </div>
          {pagination && (
            <div className="flex items-center gap-1 bg-background rounded-lg border border-border p-1">
              <Button variant="ghost" size="sm" onClick={handlePrevPage} disabled={!pagination.has_prev || currentPage <= 1} className="h-7 w-7 p-0">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm px-3 font-medium">{currentPage} / {pagination.total_pages}</span>
              <Button variant="ghost" size="sm" onClick={handleNextPage} disabled={!pagination.has_next} className="h-7 w-7 p-0">
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </motion.div>
      
      <AnimatePresence mode="popLayout">
        <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {filteredRecords.map((record: any, index: number) => (
            <LazyDocumentCard 
              key={record._id || index} 
              document={record} 
              index={index} 
              delay={Math.min(index * 0.05, 0.5)} 
              onDelete={onDataUpdate}
              onUpdate={onDataUpdate}
              dbName={dbName}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <Dialog open={showInsertDialog} onOpenChange={setShowInsertDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Insert New Document</DialogTitle>
            <DialogDescription>
              Enter the document data in JSON format. The document will be inserted into {dbName}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="json-input">Document JSON</Label>
              <textarea
                id="json-input"
                value={insertData}
                onChange={(e) => setInsertData(e.target.value)}
                className="w-full min-h-[300px] p-3 font-mono text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder='{\n  "name": "Example",\n  "value": 123\n}'
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowInsertDialog(false);
                setInsertData('{\n  \n}');
              }}
              disabled={isInserting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleInsertDocument}
              disabled={isInserting}
            >
              {isInserting ? "Inserting..." : "Insert Document"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface LazyDocumentCardProps {
  document: any;
  index: number;
  delay?: number;
  onDelete?: () => void;
  onUpdate?: () => void;
  dbName?: string;
}

function LazyDocumentCard({ document, index, delay = 0, onDelete, onUpdate, dbName }: LazyDocumentCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Load when 100px from viewport
        threshold: 0.01,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="min-h-[50px]">
      {isVisible ? (
        <DocumentCard document={document} index={index} delay={delay} onDelete={onDelete} onUpdate={onUpdate} dbName={dbName} />
      ) : (
        <div className="h-[50px] bg-card/30 rounded-lg border border-border/30 animate-pulse" />
      )}
    </div>
  );
}

interface DocumentCardProps {
  document: any;
  index: number;
  delay?: number;
  onDelete?: () => void;
  onUpdate?: () => void;
  dbName?: string;
}

function DocumentCard({ document, index, delay = 0, onDelete, onUpdate, dbName }: DocumentCardProps) {
  const [isExpanded, setIsExpanded] = useState(index === 0);
  const [isCopied, setIsCopied] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editData, setEditData] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(document, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!dbName || !document._id) {
      toast.error("Cannot delete document");
      return;
    }

    const credentials = getStoredCredentials();
    if (!credentials) {
      toast.error("No credentials found");
      return;
    }

    setIsDeleting(true);
    try {
      await deleteDocuments({
        ...credentials,
        dbName,
        query: document._id
      });
      toast.success("Document deleted successfully");
      setShowDeleteDialog(false);
      onDelete?.();
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Failed to delete document");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async () => {
    if (!dbName || !document._id) {
      toast.error("Cannot update document");
      return;
    }

    const credentials = getStoredCredentials();
    if (!credentials) {
      toast.error("No credentials found");
      return;
    }

    try {
      const updatedData = JSON.parse(editData);
      setIsUpdating(true);

      await updateDocumentById({
        ...credentials,
        dbName,
        recordId: document._id,
        updateData: updatedData
      });

      toast.success("Document updated successfully");
      setShowEditDialog(false);
      onUpdate?.();
    } catch (error) {
      console.error("Error updating document:", error);
      if (error instanceof SyntaxError) {
        toast.error("Invalid JSON format");
      } else {
        toast.error("Failed to update document");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const openEditDialog = () => {
    setEditData(JSON.stringify(document, null, 2));
    setShowEditDialog(true);
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }} 
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} 
        exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.95 }} 
        transition={{ delay, duration: 0.4, ease: 'easeOut' }} 
        whileHover={{ scale: 1.005 }} 
        layout
      >
        <Card className="p-0 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
          <CardHeader className="pb-1.5 pt-2 px-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="h-5 w-5 p-0 flex items-center justify-center">
                    <motion.div 
                      animate={{ rotate: isExpanded ? 0 : -90 }} 
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="flex items-center justify-center"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </motion.div>
                  </Button>
                </motion.div>
                <CardTitle className="text-xs font-mono flex items-center gap-1.5 leading-none">
                  <span className="text-muted-foreground text-[10px]">#{index + 1}</span>
                  <span className="truncate max-w-[300px]">{document._id || `Document ${index + 1}`}</span>
                </CardTitle>
              </div>
              <div className="flex items-center gap-1">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-6 w-6 p-0 relative">
                    <AnimatePresence mode="wait">
                      {isCopied ? (
                        <motion.div key="copied" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-green-500">✓</motion.div>
                      ) : (
                        <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <Copy className="h-3 w-3" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
                {onUpdate && (
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={openEditDialog}
                      className="h-6 w-6 p-0 text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  </motion.div>
                )}
                {onDelete && (
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowDeleteDialog(true)}
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </CardHeader>
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0, filter: 'blur(4px)' }} 
                animate={{ height: "auto", opacity: 1, filter: 'blur(0px)' }} 
                exit={{ height: 0, opacity: 0, filter: 'blur(4px)' }} 
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <CardContent className="pt-0 pb-2 px-3">
                  <div className="space-y-0">
                    <ObjectRenderer data={document} level={0} />
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this document? This action cannot be undone.
              {document._id && (
                <span className="font-mono text-xs block mt-2 text-muted-foreground">
                  ID: {document._id}
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Document</DialogTitle>
            <DialogDescription>
              Modify the document data in JSON format.
              {document._id && (
                <span className="font-mono text-xs block mt-1">
                  ID: {document._id}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-json-input">Document JSON</Label>
              <textarea
                id="edit-json-input"
                value={editData}
                onChange={(e) => setEditData(e.target.value)}
                className="w-full min-h-[300px] p-3 font-mono text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEditDialog(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Document"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface ObjectRendererProps {
  data: any;
  level: number;
  fieldName?: string;
}

function ObjectRenderer({ data, level, fieldName }: ObjectRendererProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const indent = level * 16;

  if (data === null || data === undefined) {
    return (
      <motion.div 
        initial={{ opacity: 0, filter: 'blur(2px)', x: -5 }} 
        animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }} 
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ marginLeft: `${indent}px` }} 
        className="flex items-center gap-1.5 py-0"
      >
        {fieldName && <span className="font-mono text-xs text-blue-400">{fieldName}:</span>}
        <span className="font-mono text-xs text-gray-500">null</span>
      </motion.div>
    );
  }

  if (typeof data !== 'object') {
    const color = typeof data === 'string' ? 'text-green-400' : typeof data === 'number' ? 'text-purple-400' : typeof data === 'boolean' ? 'text-yellow-400' : 'text-gray-400';
    const displayValue = typeof data === 'string' ? `"${data}"` : String(data);

    return (
      <motion.div 
        initial={{ opacity: 0, filter: 'blur(2px)', x: -5 }} 
        animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }} 
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ marginLeft: `${indent}px` }} 
        className="flex items-center gap-1.5 py-0"
      >
        {fieldName && <span className="font-mono text-xs text-blue-400">{fieldName}:</span>}
        <span className={`font-mono text-xs ${color}`}>{displayValue}</span>
      </motion.div>
    );
  }

  if (Array.isArray(data)) {
    return (
      <motion.div 
        initial={{ opacity: 0, filter: 'blur(2px)' }} 
        animate={{ opacity: 1, filter: 'blur(0px)' }} 
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ marginLeft: `${indent}px` }} 
        className="py-0"
      >
        <div className="flex items-center gap-1.5">
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="h-4 w-4 p-0 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: isExpanded ? 0 : -90 }} 
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex items-center justify-center"
              >
                <ChevronDown className="h-2.5 w-2.5" />
              </motion.div>
            </Button>
          </motion.div>
          {fieldName && <span className="font-mono text-xs text-blue-400">{fieldName}:</span>}
          <span className="font-mono text-xs text-gray-400">Array ({data.length})</span>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ height: 0, opacity: 0, filter: 'blur(2px)' }} 
              animate={{ height: "auto", opacity: 1, filter: 'blur(0px)' }} 
              exit={{ height: 0, opacity: 0, filter: 'blur(2px)' }} 
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="ml-2 border-l border-border pl-1.5 mt-0"
            >
              {data.map((item, index) => (<ObjectRenderer key={index} data={item} level={level + 1} fieldName={`[${index}]`} />))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  const keys = Object.keys(data);
  if (keys.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, filter: 'blur(2px)', x: -5 }} 
        animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }} 
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ marginLeft: `${indent}px` }} 
        className="flex items-center gap-1.5 py-0"
      >
        {fieldName && <span className="font-mono text-xs text-blue-400">{fieldName}:</span>}
        <span className="font-mono text-xs text-gray-400">{'{}'}</span>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, filter: 'blur(2px)' }} 
      animate={{ opacity: 1, filter: 'blur(0px)' }} 
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ marginLeft: `${indent}px` }} 
      className="py-0"
    >
      {fieldName && (
        <div className="flex items-center gap-1.5 mb-0">
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="h-4 w-4 p-0 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: isExpanded ? 0 : -90 }} 
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex items-center justify-center"
              >
                <ChevronDown className="h-2.5 w-2.5" />
              </motion.div>
            </Button>
          </motion.div>
          <span className="font-mono text-xs text-blue-400">{fieldName}:</span>
          <span className="font-mono text-xs text-gray-400">Object ({keys.length})</span>
        </div>
      )}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0, filter: 'blur(2px)' }} 
            animate={{ height: "auto", opacity: 1, filter: 'blur(0px)' }} 
            exit={{ height: 0, opacity: 0, filter: 'blur(2px)' }} 
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={fieldName ? "ml-2 border-l border-border pl-1.5" : ""}
          >
            {keys.map((key) => (<ObjectRenderer key={key} data={data[key]} level={level + 1} fieldName={key} />))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Models
