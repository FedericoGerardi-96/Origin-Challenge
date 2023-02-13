import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import Swal from "sweetalert2";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  startDeleteAction,
  startinsertActiveAction,
} from "../../store/actions/thunks";
import { useRouter } from "next/router";
import { useState } from "react";
import { Loader } from "../Loader";

export const ListUserActionTable = () => {
  const [isLoading, setisLoading] = useState(false);
  // traigo las acciones del usuario del store
  const { userAction } = useAppSelector((state: any) => state.action);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const swalButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const onDeleteAction = async (id: string, name: string) => {
    const result = await swalButtons.fire({
      title: `Estas Seguro que desea eliminar la accion ${name}?`,
      text: "Esta accion es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar!",
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      const ok = await dispatch(startDeleteAction(id));
      if (ok) {
        swalButtons.fire(
          "Modificada!",
          `La Accion: ${name} se modifico correctamente`,
          "success"
        );
        return;
      }
      swalButtons.fire(
        "Error!",
        `Error al modificar la accion: ${name}`,
        "warning"
      );
    }
    swalButtons.fire("Cancelado", `No se modifico la accion: ${name}`, "error");
  };

  const onSaveActiveAction = async (symbol: string, id: string) => {
    setisLoading(true);
    const ok = await dispatch(startinsertActiveAction(id));
    if (symbol === "" || !ok) {
      setisLoading(false);
      return;
    }
    router.push(`/actions/${symbol}`);
    setisLoading(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Simbolo</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Moneda</TableCell>
              <TableCell align="right">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userAction?.map((row: any, i: number) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">
                  <p
                    onClick={() => onSaveActiveAction(row.symbol, row.id)}
                    style={{ color: "#0049b0", cursor: "pointer" }}
                  >
                    {row.symbol}
                  </p>
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.currency}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => onDeleteAction(row.id, row.name)}
                    aria-label="delete"
                    size="large"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: isLoading ? "block" : "none" }}>
        <Loader />
      </Box>
    </>
  );
};
