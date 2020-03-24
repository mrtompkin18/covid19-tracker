import _ from "lodash";

import dynamic from 'next/dynamic';

import { getBarConfig } from "../common/config/chart.config";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function BarChart({ data }) {
    const { series, categories } = data;

    if (!(series && categories)) {
        return null;
    }

    return (
        <Chart
            type="area"
            options={getBarConfig(categories)}
            series={series}
            height={230}
        />
    )
}