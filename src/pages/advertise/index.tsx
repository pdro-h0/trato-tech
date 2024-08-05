import styles from "./styles.module.scss";
import Header from "../../components/header";
import { useAppDispatch, useAppSelector } from "../../store";
import Button from "../../components/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerItem } from "../../store/slices/itens";
import { useParams } from "react-router-dom";
import { Input } from "../../components/input";

const Advertise = () => {
  const dispatch = useAppDispatch();
  const { categoryId = "" } = useParams();

  enum OptionsCategoty {
    eletronicos = "eletronicos",
    automotivos = "automotivos",
    jogos = "jogos",
    escritorio = "escritorio",
    som = "som",
    default = "",
  }

  interface IInputs {
    titulo: string;
    descricao: string;
    foto: string;
    preco: number;
    categoria: OptionsCategoty | string;
  }

  const { register, handleSubmit } = useForm<IInputs>({
    defaultValues: {
      categoria: categoryId ?? OptionsCategoty.default,
    },
  });
  const cadastrar: SubmitHandler<IInputs> = (data) => {
    dispatch(registerItem(data));
  };

  console.log(categoryId);

  const { categories } = useAppSelector((state) => {
    const categories = state.categories.map(({ nome, id }) => ({ nome, id }));
    return {
      categories,
    };
  });

  return (
    <div>
      <Header
        title="Anuncie aqui!"
        description="Anuncie seu produto no melhor site do Brasil!"
      />

      <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
        <Input
          type="text"
          placeholder="Nome do produto"
          alt="nome do produto"
          {...register("titulo", { required: true })}
        />
        <Input
          type="text"
          placeholder="Descrição do produto"
          alt="descrição do produto"
          {...register("descricao", { required: true })}
        />
        <Input
          type="text"
          placeholder="URL da foto do produto"
          alt="URL da foto do produto"
          {...register("foto", { required: true })}
        />
        <select
          {...register("categoria", { required: true })}
          disabled={!!categoryId}
        >
          <option value="" disabled>
            Selecione a categoria
          </option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.nome}
            </option>
          ))}
        </select>

        <Input
          type="number"
          placeholder="preço do produto"
          {...register("preco", { required: true, valueAsNumber: true })}
        />
        <Button type="submit">Cadastrar produto</Button>
      </form>
    </div>
  );
};

export default Advertise;
