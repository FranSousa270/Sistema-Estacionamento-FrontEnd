import { ativarVaga, desativarVaga, getVagas } from "@/services/vagasServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { getSetores } from "@/services/setoresServices";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function VagasPage() {
  const queryClient = useQueryClient();
  const { data: setores } = useQuery({
    queryKey: ["setores"],
    queryFn: getSetores,
  });

  const ativarMutation = useMutation({
    mutationFn: ativarVaga,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vagas"] });
      toast.success("Vaga ativada!");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const mensagem =
          error.response?.data?.message ?? "Erro ao ativar a vaga";
        toast.error(mensagem);
      } else {
        toast.error("Erro ao ativar a vaga.");
      }
    },
  });

  const desativarMutation = useMutation({
    mutationFn: desativarVaga,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vagas"] });
      toast.success("Vaga desativada!");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const mensagem =
          error.response?.data?.message ?? "Erro ao desativar a vaga";
        toast.error(mensagem);
      } else {
        toast.error("Erro ao desativar a vaga.");
      }
    },
  });

  const {
    data: vagas,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vagas"],
    queryFn: getVagas,
  });

  if (isLoading) {
    return <p>Carregando vagas...</p>;
  }

  if (error) {
    return <p>Erro ao carregas as vagas</p>;
  }

  return (
    <>
      <h1 className="text-3xl text-center pb-8 pr-20">Vagas</h1>
      <div className="bg-slate-100 pt-6 rounded shadow-[0_-1px_6px_-1px_rgba(0,0,0,0.1),0_1px_6px_-1px_rgba(0,0,0,0.1)] pb-6">
        <div className="max-w-4xl mx-auto">
          <Table className="">
            <TableHeader>
              <TableRow className="hover:bg-slate-200">
                <TableHead className="text-left">Número</TableHead>
                <TableHead className="text-left">Setor</TableHead>
                <TableHead className="text-center">Tipo</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vagas?.map((vaga) => (
                <TableRow key={vaga.id} className="hover:bg-slate-200">
                  <TableCell className="text-left ">{vaga.numero}</TableCell>
                  <TableCell className="text-left ">
                    {setores?.find((setor) => setor.id === vaga.setorId)?.nome}
                  </TableCell>
                  <TableCell className="text-center">{vaga.tipo}</TableCell>
                  <TableCell className="text-right ">
                    {vaga.ativa ? "Ativa" : "Inativa"}
                  </TableCell>
                  <TableCell className="text-right">
                    {vaga.ativa ? (
                      <Button
                        className="bg-red-600 rounded hover:bg-red-700 cursor-pointer"
                        onClick={() => desativarMutation.mutate(vaga.id)}
                      >
                        Desativar
                      </Button>
                    ) : (
                      <Button
                        className="bg-green-600 p-4 rounded hover:bg-green-700 cursor-pointer"
                        onClick={() => ativarMutation.mutate(vaga.id)}
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
            render={<Link to="/vagas/cadastro">Cadastrar Vaga</Link>}
          />
        </div>
      </div>
    </>
  );
}

export default VagasPage;
