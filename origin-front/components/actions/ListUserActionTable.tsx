import Link from "next/link";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { startDeleteAction } from "../../store/actions/thunks";

export const ListUserActionTable = () => {
  // traigo las acciones del usuario del store
  const { action } = useAppSelector((state: any) => state.action);

  const dispatch = useAppDispatch();

  const onDeleteAction = async (id: string) => {
    const ok = await dispatch(startDeleteAction(id));
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
            {action?.map((row: any, i: number) => (
              <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="right">
                  <Link style={{ color: "#0049b0" }} href={`/actions/${row.symbol}`}>
                    {row.symbol}
                  </Link>
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.currency}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onDeleteAction(row.id)} aria-label="delete" size="large">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
