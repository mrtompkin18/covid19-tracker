import _ from "lodash";

export const FILTER_TYPE = { THAILAND: "TH", GLOBAL: "GL" };

export function tranformsDonutData(data) {
    const categories = ["ผู้ติดเชื้อ", "ผู้รับการรักษา", "ผู้เสียชีวิต"];
    const series = Object.values(data).reduce((prev, val) => {
        return prev.concat(val.value)
    }, []).slice(0, 3);

    return {
        series,
        categories
    }
}

export function tranformsBarData(data) {
    let sorted = _.orderBy(data, 'reportDate')
        .reverse()
        .slice(0, 7);

    sorted = sorted
        .reverse()
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

    const series = [{ name: 'ผู้ติดเชื้อ', data: sorted.totalConfirmed }];
    const { categories } = sorted;

    return {
        series,
        categories
    }
}