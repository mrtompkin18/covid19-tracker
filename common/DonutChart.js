import dynamic from "next/dynamic";

import { getDonutConfig } from "./config/chart.config";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function DonutChart({ data }) {
    const { series, categories } = data;

    if (!(series && categories)) {
        return null;
    }

    return (
        <Chart
            type="donut"
            options={getDonutConfig(categories)}
            series={series}
            height={210}
        />
    )
}