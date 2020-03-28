import React from "react";
import dynamic from "next/dynamic";

import { getDonutConfig } from "./config/chart.config";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function DonutChart({ data }) {
    const { series, categories } = data;

    return (
        <Chart
            type="donut"
            options={getDonutConfig(categories)}
            series={series}
            height={230}
        />
    )
}

export default React.memo(DonutChart);