import React from "react";
import dynamic from 'next/dynamic';

import { getBarConfig } from "../common/config/chart.config";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function BarChart({ data, loading }) {
    const { series, categories } = data;
    return (
        <Chart
            type="area"
            options={getBarConfig(categories)}
            series={series}
            height={220}
        />
    )
};

export default React.memo(BarChart);
