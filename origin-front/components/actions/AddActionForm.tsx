import { FormEvent, useMemo, useState } from "react";

import { TextField, Autocomplete, Box, Button } from "@mui/material";

import { useAppDispatch } from "../../hooks/redux";
import { getActions } from "../../helpers";
import { IAction } from "../../interface";
import { startInsertAction } from "../../store/actions/thunks";

interface IActionsOption {
  label: string;
  id: string;
  action: IAction;
}

export const AddActionForm = () => {
  // Estado para todas las acciones del autocomplete
  const [ActionsArray, setActionsArray] = useState<IActionsOption[] | null>();
  // Accion seleccionada para que el usuario pueda agregarla
  const [actionsSelected, setactionsSelected] = useState<IActionsOption | null>();

  const dispatch = useAppDispatch();

  // Guardo en el state los datos para el autocomplete
  useMemo(async () => {
    const ActionsResponse = await getActions();
    if (ActionsResponse === null) return;
    const ActionsOptionFormat = ActionsResponse?.map(
      ({ name, symbol, currency, exchange, mic_code, country, type }) => {
        return { label: name, id: symbol, action: { currency, exchange, mic_code, country, type, name, symbol } };
      }
    );
    setActionsArray(ActionsOptionFormat);
  }, []);

  // Funcion del evento submit para guardar en base la accion seleccionada
  const onInsertAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!actionsSelected) return;
    const { action } = actionsSelected!;
    const ok = await dispatch(startInsertAction(action));
  };

  return (
    <>
      <Box
        sx={{
          flexDirection: { xs: "column", md: "row" },
          marginBottom: 6,
        }}
      >
        <form
          style={{ width: "100%", display: "flex", justifyContent: "space-around" }}
          onSubmit={(e) => onInsertAction(e)}
        >
          <Autocomplete
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, value) => setactionsSelected(value)}
            options={ActionsArray! || []}
            sx={{ width: "75%" }}
            renderOption={(props, option) => {
              return (
                <li style={{ color: "#000" }} {...props} key={option.id}>
                  {option.label}
                </li>
              );
            }}
            renderInput={(params) => <TextField {...params} label="Action" />}
          />
          <Button type="submit" sx={{ marginTop: { xs: 5, md: 0 } }} variant="outlined">
            Agregar Símbolo
          </Button>
        </form>
      </Box>
    </>
  );
};
