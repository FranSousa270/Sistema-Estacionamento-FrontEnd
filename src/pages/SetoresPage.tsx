import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ativarSetor,
  desativarSetor,
  getSetores,
} from "@/services/setoresServices";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function SetoresPage() {
  const queryClient = useQueryClient();
  const ativarMutation = useMutation({
    mutationFn: ativarSetor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["setores"] });
      toast.success("Setor ativado!");
    },
  });

  const desativarMutation = useMutation({
    mutationFn: desativarSetor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["setores"] });
      toast.success("Setor desativado!");
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["setores"],
    queryFn: getSetores,
  });

  if (isLoading) {
    return <p>Carregando...</p>;
  }
  if (error) {
    return <p>Erro ao carregar setores</p>;
  }
  return (
    <>
      <h1 className="text-3xl text-center pb-8 pr-20">Setores</h1>
      <div className="bg-slate-100 pt-6 rounded shadow-[0_-1px_6px_-1px_rgba(0,0,0,0.1),0_1px_6px_-1px_rgba(0,0,0,0.1)] pb-6">
      <div className="max-w-3xl mx-auto rounded">
        <Table className="">
          <TableHeader>
            <TableRow className="hover:bg-slate-200">
              <TableHead className="text-lef">Nome</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((setor) => (
              <TableRow key={setor.id} className="hover:bg-slate-200">
                <TableCell className="text-left ">{setor.nome}</TableCell>
                <TableCell className="text-center ">
                  {setor.ativo ? "Ativo" : "Inativo"}
                </TableCell>
                <TableCell className="text-right">
                  {setor.ativo ? (
                    <Button
                      className="bg-red-600 rounded hover:bg-red-700 cursor-pointer"
                      onClick={() => desativarMutation.mutate(setor.id)}
                    >
                      Desativar
                    </Button>
                  ) : (
                    <Button
                      className="bg-green-600 p-4 rounded hover:bg-green-700 cursor-pointer"
                      onClick={() => ativarMutation.mutate(setor.id)}
                    >
                      Ativar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          className="mt-6 rounded"
          render={<Link to="/setores/cadastro">Cadastrar Setor</Link>}
        />
      </div>
      </div>
    </>
  );
}
export default SetoresPage;
