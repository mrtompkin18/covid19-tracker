import _ from "lodash";
import numeral from "numeral";

export function getDonutConfig(categories) {
    return {
        chart: {
            toolbar: {
                show: false,
            }
        },
        stroke: {
            show: false
        },
        colors: ['#ff5f6d', '#E100FF', '#1D1653'],
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '14px',
                fontFamily: 'Poppins',
                fontWeight: '100'
            },
            dropShadow: {
                blur: 5,
            },
            formatter: function (val, opt) {
                return numeral(val).format('0').concat("%")
            }
        },
        labels: categories,
        fill: {
            type: 'gradient',
            gradient: {
                gradientToColors: ['#ffc371', '#7F00FF', '#0f0f2a'],
            }
        },
        legend: {
            position: "right",
            fontSize: '16px',
            fontFamily: 'Athiti',
            offsetX: -10,
            labels: {
                colors: '#b1afee',
            },
        },
        responsive: [{
            breakpoint: 418,
            options: {
                legend: {
                    position: "bottom",
                }
            },
        }]
    }
}

export function getBarConfig(categories) {
    return {
        chart: {
            type: 'area',
            toolbar: {
                show: false,
            }
        },
        colors: ['#f7b200', '#ff00e2'],
        fill: {
            type: "gradient",
            gradient: {
                colorStops: [
                    {
                        offset: 20,
                        color: "#f7b200",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "#ff00e2",
                        opacity: 0
                    },
                ]
            }
        },
        tooltip: {
            theme: 'dark',
            style: {
                fontSize: '12px'
            },
            x: {
                show: false,
            }
        },
        zoom: {
            enabled: false
        },
        grid: {
            borderColor: 'rgba(255,255,255,0.04)'
        },
        stroke: {
            show: false,
        },
        dataLabels: {
            enabled: false
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#413f75',
                    fontSize: '12px',
                    fontFamily: 'Poppins'
                }
            }
        },
        xaxis: {
            categories: categories,
            labels: {
                style: {
                    colors: '#b1afee',
                    fontSize: '11px',
                    fontFamily: 'Poppins'
                },
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
        },
    }
}