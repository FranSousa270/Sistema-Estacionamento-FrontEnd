import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSetor, getSetores } from "@/services/setoresServices";
import type { Setor } from "@/types/setor";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SetorFormData } from "@/schemas/setorSchema";
import { setorSchema } from "@/schemas/setorSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

function SetoresPage() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createSetor,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['setores']})
      form.reset()
    },
  })

  const form = useForm<SetorFormData>({
    resolver: zodResolver(setorSchema),
    defaultValues: {
      nome: "",
    },
  });
  function onSubmit(dados: SetorFormData) {
  mutation.mutate(dados)
}
  return (
    <>
    <div className="max-w-md mx-auto p-4">

      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
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
                className="border-black focus-visible:ring-slate-900"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit">Cadastrar Setor</Button>
      </form>
      </div>
    </>
  );
}
export default SetoresPage;
