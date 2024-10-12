"use client"

import { EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/services/auth/auth";
import { useUserStore } from "@/store/user-store";

type Inputs = {
  email: string
  password: string
}

export default function AuthForm() {
  const setUser = useUserStore(state => state.addUser);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    await auth({...data, rememberMe}).then(
      ({user}) => {
        setUser(user);
        window.location.reload()
      }
    );
    setIsLoading(false);
  }
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-primary">Login</h1>
          <p className="text-muted-foreground">Entre com seu email e senha para acessar o sistema</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="email@exemplo.com"
              {...register("email")}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"}
                {...register("password")}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" onClick={() => setRememberMe(!rememberMe)} />
            <Label htmlFor="remember" className="text-sm cursor-pointer">Lembrar de mim</Label>
          </div>
          <Button type="submit" className="w-full">
            {isLoading ? <LoaderIcon className="animate-spin" /> : "Login"}
          </Button>
        </form>
        <div className="text-center">
          <a href="#" className="text-sm text-primary hover:underline">Esqueceu sua senha?</a>
        </div>
      </div>
    </div>
  )
}