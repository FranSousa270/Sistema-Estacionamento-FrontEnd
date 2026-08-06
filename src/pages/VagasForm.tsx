import { getSetores } from "@/services/setoresServices";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { VagaFormData } from "@/schemas/vagaSchema";
import { vagaSchema } from "@/schemas/vagaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { createVaga } from "@/services/vagasServices";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function VagasForm() {
  const { data: setores } = useQuery({
    queryKey: ["setores"],
    queryFn: getSetores,
  });

  const form = useForm<VagaFormData>({
    resolver: zodResolver(vagaSchema),
    defaultValues: {
      numero: "",
      setorId: undefined,
      tipo: undefined,
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createVaga,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vagas"] });
      form.resetField("numero");
      toast.success("Vaga criada com sucesso!");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const mensagem =
          error.response?.data?.message ?? "Erro ao cadastrar vaga";
        toast.error(mensagem);
      } else {
        toast.error("Erro ao cadastrar a vaga");
      }
    },
  });
  function onSubmit(dados: VagaFormData) {
    mutation.mutate(dados);
  }
  return (
    <>
      {" "}
      <div className="space-y-4 max-w-md mx-auto">
        <h1 className="text-3xl pb-2 text-center ">Cadastro de Vagas</h1>
        <Card className="">
          <CardContent>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
              <Controller
                name="numero"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Número da Vaga</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Ex A2"
                      autoComplete="off"
                      className="border-black rounded focus-visible:ring-slate-600"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="setorId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Setor</FieldLabel>
                    <Select
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger
                        className="border-black rounded"
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Selecione o setor">
                          {(value: string) =>
                            value
                              ? setores?.find(
                                  (setor) => setor.id === Number(value),
                                )?.nome
                              : "Selecione o setor"
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {setores?.map((setor) => (
                          <SelectItem
                            key={setor.id}
                            value={setor.id.toString()}
                          >
                            {setor.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="tipo"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Tipo de Vaga</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className="border-black rounded"
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CARRO">Carro</SelectItem>
                        <SelectItem value="MOTO">Moto</SelectItem>
                        <SelectItem value="PCD">PCD</SelectItem>
                        <SelectItem value="IDOSO">Idoso</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button type="submit" className="rounded mt-2 cursor-pointer">
                Cadastrar vaga
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            className="p-3 rounded"
            render={<Link to="/vagas">Voltar</Link>}
          />
        </div>
      </div>
    </>
  );
}

export default VagasForm;
