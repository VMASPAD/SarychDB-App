import { useEffect, useState, useCallback, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { Loader2, Home, Database, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CodeEditor from './ViewsData/Editor';
import Models from './ViewsData/Models';
import { getDatabasesContent, getDatabaseStats, getStoredCredentials } from '@/lib/operations';
import { toast } from 'sonner';

function ViewData() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(100);
  
  const credentials = useMemo(() => getStoredCredentials(), []);
  
  const loadData = useCallback(async (page: number, limit: number) => {
    if (!credentials || !id) return;
    
    setIsLoading(true);
    try {
      const result = await getDatabasesContent({
        ...credentials,
        dbName: id,
        limit,
        page
      });
      setData(result);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, [id, credentials]);

  const loadStats = useCallback(async () => {
    if (!credentials || !id) return;
    
    try {
      const result = await getDatabaseStats({
        ...credentials,
        dbName: id
      });
      setStats(result);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  }, [id, credentials]);

  useEffect(() => {
    if (!credentials) {
      navigate('/');
      return;
    }
    loadData(currentPage, currentLimit);
    loadStats();
  }, [credentials, navigate, loadData, loadStats, currentPage, currentLimit]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleLimitChange = useCallback((limit: number) => {
    setCurrentLimit(limit);
    setCurrentPage(1);
  }, []);
  
  const handleDataUpdate = useCallback(() => {
    loadData(currentPage, currentLimit);
    loadStats();
  }, [loadData, loadStats, currentPage, currentLimit]);
  
  if (isLoading && !data) {
    return (
      <div className="container mx-auto p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center h-[60vh] gap-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="h-12 w-12 text-primary" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-2"
          >
            <h2 className="text-xl font-semibold">Loading Database</h2>
            <p className="text-muted-foreground">Fetching data from {id}...</p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto p-6 space-y-3"
    >
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 text-sm text-muted-foreground mb-4"
      >
        <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="h-8 gap-2">
          <Home className="h-4 w-4" />
          Home
        </Button>
        <ChevronRight className="h-4 w-4" />
        <Button variant="ghost" size="sm" onClick={() => navigate('/databases')} className="h-8 gap-2">
          <Database className="h-4 w-4" />
          Databases
        </Button>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">{id}</span>
      </motion.div>

      <h1 className="text-2xl font-bold flex items-center justify-between">
        <span>Database: {id}</span>
        {stats && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground font-normal">
            <span>{stats.total_records} records</span>
            <span>{(stats.size_bytes / 1024).toFixed(2)} KB</span>
          </div>
        )}
      </h1>
      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="editor">JSON Editor</TabsTrigger>
          <TabsTrigger value="models">Models View</TabsTrigger>
        </TabsList>
        <TabsContent value="editor" className="mt-4">
          <CodeEditor data={data} />
        </TabsContent>
        <TabsContent value="models" className="mt-4">
          <Models 
            data={data} 
            isLoading={isLoading}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
            onDataUpdate={handleDataUpdate}
            currentPage={currentPage}
            currentLimit={currentLimit}
            dbName={id}
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

export default ViewData
