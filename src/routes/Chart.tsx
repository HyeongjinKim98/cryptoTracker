import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { shallowEqualObjects } from "react-query/types/core/utils";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}
const ToggleBtn = styled.button``;
interface ChartProps {
    coinId: string
}

function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
        fetchCoinHistory(coinId));
    const lineSeries: ApexAxisChartSeries = [
        {
            name: "Price",
            data: data?.map(price => Number(price.close)) as number[],
        },
    ];
    const candleSeries: ApexAxisChartSeries = [
        {
            name: "Price",
            data: data?.map(price => {
                return {
                    x: price.time_close,
                    y: [
                        price.open,
                        price.high,
                        price.low,
                        price.close,
                    ],
                };
            }) ?? [],
        },
    ];

    const [isCandle,setCandle] = useState(false);
    const lineOptions : ApexOptions = {
        theme: {
            mode: "dark"
        },
        chart: {
            height: 500,
            width: 500,
            toolbar: { show: false },
            background: "transparent"
        },
        grid: { show: false },
        stroke: {
            curve: "smooth",
            width: 4
        },
        yaxis: { show: false },
        xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                // show: false,
                format:"M/dd"
            },
            type : "datetime",
            categories: data?.map(price => new Date(Number(price.time_close) * 1000))
        },
        fill: {
            type: "gradient",
            gradient: {
                gradientToColors: ["#0be881"],
                stops: [0, 100]
            },
        },
        colors: ["#0fbcf9"],
        tooltip: {
            y: {
                formatter: (value: number) => `$${value.toFixed(2)}`
            }
        }
    }
    const candleOptions: ApexOptions = {
        theme: {
            mode: "dark",
        },
        chart: {
            type: "candlestick",
            height: 500,
            width: 500,
            toolbar: { show: false },
            background: "transparent",
        },
        grid:{show:false},
        // title: {
        //   text: "CandleStick Chart",
        //   align: "left",
        // },
        xaxis: {
            labels: {
                // show: false,
                format: "M/dd",
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            type: "datetime",
        },
        yaxis: {
            // show: false,
            tooltip: {
                enabled: true,                
            },
        },
        tooltip: {
            y: {
                formatter: (value: number) => `$${value.toFixed(2)}`
            }
        }
    };

    const changeChart = () =>{
        setCandle(!isCandle);
    };
    return (
        <div>
            {isLoading ? "Loading chart ..." :
            <>
            <ApexChart
                    series = {lineSeries}
                    options={lineOptions}
                    type="line" />
            <ApexChart
                    series={candleSeries}
                    options={candleOptions}
                    type="candlestick" />
            </>
        }</div>
    )
}
export default Chart;