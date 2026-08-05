import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSetor } from "@/services/setoresServices";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SetorFormData } from "@/schemas/setorSchema";
import { setorSchema } from "@/schemas/setorSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { isAxiosError } from "axios";

function SetoresForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createSetor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["setores"] });
      form.reset();
      toast.success("Setor cadastrado com sucesso!");
    },
    onError: (error) => {
      if(isAxiosError(error)){
        const mensagem = error.response?.data?.message ?? "Erro ao cadastrar o setor"
        toast.error(mensagem)
      }
      else{
      toast.error("Erro ao cadastrar o setor.");
      }
    },
  });

  const form = useForm<SetorFormData>({
    resolver: zodResolver(setorSchema),
    defaultValues: {
      nome: "",
    },
  });
  function onSubmit(dados: SetorFormData) {
    mutation.mutate(dados);
  }
  return (
    <>
      <div className="max-w-md mx-auto">
        <h1 className="text-center pb-6 text-3xl">Cadastro de Setores</h1>
        <Card>
          <CardContent className="">
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <Controller
                name="nome"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Nome do Setor</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Ex Setor A"
                      autoComplete="off"
                      className="border-black focus-visible:ring-slate-600"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button type="submit" className="rounded cursor-pointer">
                Cadastrar Setor
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="flex justify-end mt-6">
          <Button
            variant="outline"
            className="p-3"
            render={<Link to="/setores">Voltar</Link>}
          />
        </div>
      </div>
    </>
  );
}
export default SetoresForm;
