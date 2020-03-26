import _ from "lodash";

export const FILTER_TYPE = { THAILAND: "TH", GLOBAL: "GL" };

export function transformDonutData(data) {
    const categories = ["ผู้ติดเชื้อ", "ผู้รับการรักษา", "ผู้เสียชีวิต"];
    const series = Object.values(data)
        .reduce((prev, val) => prev.concat(val.value), [])
        .slice(0, 3);

    return {
        series,
        categories
    }
}

export function transformBarData(data) {
    const size = data.length;

    // Get only 7-day latest
    const transformedData = data.slice(size - 7, size)
        .reduce((prev, val) => {
            return {
                ...prev,
                totalConfirmed: [
                    ...prev.totalConfirmed,
                    val.totalConfirmed
                ],
                categories: [
                    ...prev.categories,
                    val.reportDate
                ]
            }
        }, {
            totalConfirmed: [],
            categories: []
        });

    const series = [{ name: 'ผู้ติดเชื้อ', data: transformedData.totalConfirmed }];
    const { categories } = transformedData;

    return {
        series,
        categories
    }
}