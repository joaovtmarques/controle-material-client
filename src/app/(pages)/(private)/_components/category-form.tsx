import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addCategory } from "@/services/categories/add-category";
import { updateCategory } from "@/services/categories/update-category";
import type { Category } from "@/shared/models/category";
import { useUserStore } from "@/store/user-store";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CategoryFormProps {
  categoryType: string;
  category?: Category;
}

export default function CategoryForm({ categoryType, category }: CategoryFormProps) {
  const user = useUserStore(state => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  const handleAddCategory = async () => {
    setIsLoading(true);
    if(name === "") toast.error("Preencha todos os campos.");
      await addCategory({
        name,
        userType: user!.type
      })
      .then((response) => {
        setIsLoading(false);
        if (response) {
          toast("Categoria criada com sucesso.", {
            description: "Clique em confirmar para atualizar a página e ver as mudanças.",
            action: {
              label: "Confirmar",
              onClick: () => window.location.reload(),
            },
          });
        }
      })
      .catch(error => {
        toast.error(error.message);
      });

  }

  const handleUpdateCategory = async () => {
    setIsLoading(true);
    if(category) {
      if(name === "") toast.error("Preencha todos os campos.");
      await updateCategory({
        id: category.id,
        name,
      })
      .then((response) => {
        setIsLoading(false);
        if (response) {
          toast("Categoria atualizada com sucesso.", {
            description: "Clique em confirmar para atualizar a página e ver as mudanças.",
            action: {
              label: "Confirmar",
              onClick: () => window.location.reload(),
            },
          });
        }
      })
      .catch(error => {
        toast.error(error.message);
      });
    } else {
      toast.error("Categoria inexistente");
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{categoryType === "CREATE" ? "Adicionar categoria" : "Atualizar categoria"}</DialogTitle>
        <DialogDescription>
          {categoryType === "CREATE" ? "Preencha o campo para registrar uma categoria"
          : "Atualize o nome da categoria no campo abaixo"}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flex flex-col gap-4">
          <Label htmlFor="name" className="text-left">
            Nome da categoria
          </Label>
          <Input
            id="name"
            className="col-span-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={categoryType === "CREATE" ? handleAddCategory : handleUpdateCategory}>
          {isLoading ? <LoaderIcon className="mr-2 h-4 w-4 animate-spin" /> : "Salvar"}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}