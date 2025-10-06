import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { checkUser } from "@/lib/operations"
import { useState } from "react"
import { useNavigate } from "react-router"
import { motion } from "framer-motion"
import { Loader2, AlertCircle } from "lucide-react"

export default function LogIn() {
  const [loginUser, setLoginUser] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSaveDataUser = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    setIsLoading(true);
    setError("");
    
    localStorage.setItem("userServer", loginUser);
    localStorage.setItem("passwordServer", loginPassword);
    
    try {
      const checkConnection = await checkUser({user: loginUser, password: loginPassword});
      if (checkConnection) {
        localStorage.setItem("isLoged", "true");
        navigate("/databases");
      }
    } catch (error) {
      console.error("Error checking user:", error);
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-transparent px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Logo/Icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-8 space-y-4"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <img className="h-24 w-24 text-primary" src="/SDB.svg"/>
          </motion.div>
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Welcome to SarychDB</h1>
            <p className="text-muted-foreground mt-2">Sign in to manage your databases</p>
          </div>
        </motion.div>

        <Card className="relative z-10 w-full backdrop-blur-sm bg-card/80 border border-border/50 shadow-2xl overflow-hidden">
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          />
          
          <div className="relative">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your credentials to access your databases
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSaveDataUser}>
                <div className="flex flex-col gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid gap-2"
                  >
                    <Label htmlFor="login-user">Username</Label>
                    <Input
                      id="login-user"
                      placeholder="Enter your username"
                      value={loginUser}
                      onChange={(e) => setLoginUser(e.target.value)}
                      disabled={isLoading}
                      required
                      className="transition-all focus:scale-[1.02]"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid gap-2"
                  >
                    <Label htmlFor="login-password">Password</Label>
                    <Input 
                      id="login-password" 
                      type="password" 
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      disabled={isLoading}
                      required
                      className="transition-all focus:scale-[1.02]"
                    />
                  </motion.div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
                    >
                      <AlertCircle className="h-4 w-4 text-destructive" />
                      <p className="text-sm text-destructive">{error}</p>
                    </motion.div>
                  )}
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex-col gap-2">
              <br />
              <motion.div
                className="w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  className="w-full gap-2 relative overflow-hidden group" 
                  onClick={handleSaveDataUser}
                  disabled={isLoading || !loginUser || !loginPassword}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/20 to-primary/0"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader2 className="h-4 w-4" />
                        </motion.div>
                        Connecting...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </span>
                </Button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xs text-center text-muted-foreground"
              >
                Your data, we don't store it. All credentials are stored locally.
              </motion.p>
            </CardFooter>
          </div>
        </Card>

        {/* Footer decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Powered by <span className="font-semibold text-primary">SarychDB</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
