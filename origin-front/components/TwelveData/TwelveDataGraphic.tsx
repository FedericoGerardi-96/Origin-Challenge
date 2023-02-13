import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useAppSelector } from "../../hooks/redux";
import { TwelveDataQuotes_Graphic } from "@/interface";

interface Props {
  symbol: string;
}

export const TwelveDataGraphic = ({ symbol }: Props) => {
  // Estado para ocultar o mostrar el grafico
  // const [showGraphic, setShowGraphic] = useState(false);

  // States de los datos a mostrar en el grafico
  const [graphicDatesx, setGraphicDatesx] = useState<string[]>([]);
  const [graphicDatesy, setGraphicDatesy] = useState<number[]>([]);

  const { data, showGraphic } = useAppSelector((state: any) => state.twelveData);

  // Cuando cambie los valores de la busqueda actualizo los datos del grafico
  useEffect(() => {
    setGraphicDatesx([]);
    setGraphicDatesy([]);
    data.map(({ close: Close, datetime }: TwelveDataQuotes_Graphic) => {
      let close = Number(Close);
      setGraphicDatesx((oldArray) => [...oldArray, datetime]);
      setGraphicDatesy((oldArray) => [...oldArray, close]);
    });
  }, [data]);

  // Opciones a mostrar en el grafico
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

  return (
    <>
      <Box sx={{ display: showGraphic ? "block" : "none" }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Box>
    </>
  );
};
