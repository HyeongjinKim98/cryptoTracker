import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { shallowEqualObjects } from "react-query/types/core/utils";

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
interface ChartProps {
    coinId: string
}

function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
        fetchCoinHistory(coinId));
    console.log(data?.map((price => price.close)) as number[])
    return <div>{isLoading ? "Loading chart ..." :
        <ApexChart
            type="line"
            series={[
                {
                    name: "Price",
                    data: data?.map((price => Number(price.close))) as number[],

                },
            ]}
            options={{
                theme: {
                    mode: "dark"
                },
                chart: {
                    height: 500,
                    width: 500,
                    toolbar: { show: false },
                    background: "transparent"
                },
                stroke: {
                    curve: "smooth",
                    width: 4
                },
                yaxis: { show: false },
                xaxis: {
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    labels: { show: false },
                    categories : data?.map(price =>new Date(Number(price.time_close)*1000))
                },
                grid: { show: false }

            }} />
    }</div>
}
export default Chart;