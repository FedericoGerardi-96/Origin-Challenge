import { useEffect, useState } from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import dayjs, { Dayjs } from "dayjs";

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { Layout } from "../../components";
import { authStatus } from "../../hooks/useUserStatus";
import { getActionsInfo } from "../../helpers/getActionsInfo";
import { useAppSelector } from "@/hooks/redux";

const Action: NextPage = () => {
  const [DateSince, setDateSince] = useState<Dayjs | null>(dayjs());
  const [DateTo, setDateTo] = useState<Dayjs | null>(dayjs());
  const [radioButtonState, setradioButtonState] = useState("0");
  const [intervalId, setintervalId] = useState("");
  const [showGraphic, setShowGraphic] = useState(false);

  const { user } = useAppSelector((state: any) => state.auth);
  const { name } = user;

  const [graphicDatesx, setGraphicDatesx] = useState<string[]>([]);
  const [graphicDatesy, setGraphicDatesy] = useState<number[]>([]);

  // get symbol of pharams
  const router = useRouter();
  let symbol: string = router.asPath.split("/")[2];

  // check user authenticated
  const isAuthenticated = authStatus();
  if (!isAuthenticated) {
    router.replace("/auth/login");
    return null;
  }

  // select change event
  const handleChange = (event: SelectChangeEvent) => {
    setintervalId(event.target.value as string);
  };

  const onSearchActionInfo = async (e: any) => {
    let res = [];
    e.preventDefault();
    const start_day = dayjs(DateSince).format("YYYY-MM-DD");
    let start_date = `${start_day}`;
    const end_day = dayjs(DateTo).format("YYYY-MM-DD");
    let end_date = `${end_day}`;
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
      res = await getActionsInfo({ symbol, interval });
      if (res != null) {
        setGraphicDatesx([]);
        setGraphicDatesy([]);
        res.map((date: any) => {
          let close = Number(date.close);
          setGraphicDatesx((oldArray) => [...oldArray, date.datetime]);
          setGraphicDatesy((oldArray) => [...oldArray, close]);
        });
        setShowGraphic(true);
      }
      return;
    }
    res = await getActionsInfo({ symbol, interval, end_date, start_date });
    setGraphicDatesx([]);
    setGraphicDatesy([]);
    res.map((date: any) => {
      let close = Number(date.close);
      setGraphicDatesx((oldArray) => [...oldArray, date.datetime]);
      setGraphicDatesy((oldArray) => [...oldArray, close]);
    });
    setShowGraphic(true);
  };

  const options = {
    title: {
      text: symbol,
    },
    xAxis: {
      name: "Intervalo",
      categories: graphicDatesx,
    },
    series: [{ data: graphicDatesy, name: "Intervalo" }],
    accessibility: {
      enabled: false,
    },
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setradioButtonState((event.target as HTMLInputElement).value);
  };

  return (
    <Layout title="Mis Acciones" pageDescription="Acciones preferidas de cada usuario">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h4">{symbol}</Typography>
        <Typography variant="h4">{name}</Typography>
      </Box>
      <Divider />
      <form onSubmit={onSearchActionInfo}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 6 }}>
          <Box>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="0"
              name="radio-buttons-group"
              onChange={handleRadioChange}
            >
              <FormControlLabel value="0" control={<Radio />} label="Tiempo Real" />
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 4, marginTop: 6 }}>
                <FormControlLabel value="1" control={<Radio />} label="Histórico" />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    inputFormat="DD/MM/YYYY hh:mm:ss"
                    value={DateSince}
                    onChange={(newValue) => setDateSince(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    inputFormat="DD/MM/YYYY hh:mm:ss"
                    renderInput={(props) => <TextField {...props} />}
                    label="DateTimePicker"
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
      <Box sx={{ display: showGraphic ? "block" : "none" }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Box>
    </Layout>
  );
};

export default Action;
