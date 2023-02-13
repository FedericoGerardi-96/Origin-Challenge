import { useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import Swal from "sweetalert2";

import { useAppDispatch } from "../../hooks/redux";

import dayjs, { Dayjs } from "dayjs";
import { getTwelveData } from "@/store/TwelveData/thunks";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Props {
  symbol: string;
}

export const TwelveDataForm = ({ symbol }: Props) => {
  // States del select para el intervalo
  const [intervalId, setintervalId] = useState("");
  // States para las fechas
  const [DateSince, setDateSince] = useState<Dayjs | null>(dayjs());
  const [DateTo, setDateTo] = useState<Dayjs | null>(dayjs());
  // States de los radio buttons para seleccionar si se quiere los datos historicos o en tiempo real
  const [radioButtonState, setradioButtonState] = useState("0");

  const dispatch = useAppDispatch();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setradioButtonState((event.target as HTMLInputElement).value);
  };

  // Evento onChange del select de los intervalos
  const handleChange = (event: SelectChangeEvent) => {
    setintervalId(event.target.value as string);
  };

  const onSearchActionInfo = async (e: any) => {
    e.preventDefault();

    let ok: boolean = false;

    const start_date = dayjs(DateSince).format("YYYY-MM-DD");
    const end_date = dayjs(DateTo).format("YYYY-MM-DD");

    let interval: string = "";
    switch (intervalId.toString()) {
      case "10":
        interval = "1min";
        break;
      case "20":
        interval = "5min";
        break;
      case "30":
        interval = "15min";
        break;
      default:
        break;
    }
    if (interval === "") return;
    if (radioButtonState == "0") {
      ok = await dispatch(getTwelveData({ symbol, interval }));

      if (ok) {
        Swal.fire("Success", "Busqueda correcta", "success");
        return;
      }
      Swal.fire("Error", "Error", "warning");

      return;
    }
    ok = await dispatch(
      getTwelveData({ symbol, interval, end_date, start_date })
    );
    if (ok) {
      Swal.fire("Success", "Busqueda correcta", "success");
      return;
    }
    Swal.fire("Error", "Error", "warning");
  };

  return (
    <form onSubmit={onSearchActionInfo}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          marginBottom: 6,
        }}
      >
        <Box>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="0"
            name="radio-buttons-group"
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="0"
              control={<Radio />}
              label="Tiempo Real"
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 4,
                marginTop: 6,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Histórico"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  inputFormat="DD/MM/YYYY hh:mm:ss"
                  value={DateSince}
                  onChange={(newValue) => setDateSince(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  inputFormat="DD/MM/YYYY hh:mm:ss"
                  renderInput={(props) => <TextField {...props} />}
                  value={DateTo}
                  onChange={(newValue) => {
                    setDateTo(newValue);
                  }}
                />
              </LocalizationProvider>
            </Box>
          </RadioGroup>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Intervalo</InputLabel>
            <Select
              onChange={handleChange}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={intervalId}
              label="Intervalo"
            >
              <MenuItem value={10}>1 Min</MenuItem>
              <MenuItem value={20}>5 Min</MenuItem>
              <MenuItem value={30}>15 Min</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button type="submit" variant="contained">
          Graficar
        </Button>
      </Box>
    </form>
  );
};
