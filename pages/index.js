import { useState, useEffect } from "react";
import _ from "lodash";

import Layout from "./components/Layout";
import FilterTypeButton from "./components/FilterTypeButton"
import Card from "./components/Card";
import BarChart from "../common/BarChart";
import DonutChart from "../common/DonutChart";

import { FILTER_TYPE, tranformsBarData, tranformsDonutData } from "../common";
import * as API from "./api/covid.api";

export default () => {
    //State
    const [filterType, setFilterType] = useState();
    const [filteredData, setFilteredData] = useState({});
    const [covid, setCovid] = useState({});
    const [barChart, setBarchart] = useState({});
    const [donutChart, setDonutchart] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const covidThai = await API.covidThai();
            const covidGlobal = await API.covidGlobal();
            const covidDaily = await API.covidDaily();

            setCovid({
                thailand: covidThai.data,
                global: covidGlobal.data,
            })

            setBarchart(tranformsBarData(covidDaily.data))
            setFilterType(FILTER_TYPE.GLOBAL);
        }
        fetchData();
    }, [])

    useEffect(() => {
        const { thailand, global } = covid;
        if (filterType === FILTER_TYPE.THAILAND) {
            setFilteredData(thailand);
            setDonutchart(tranformsDonutData(thailand))
        } else if (filterType === FILTER_TYPE.GLOBAL) {
            setFilteredData(global);
            setDonutchart(tranformsDonutData(global))
        }
    }, [filterType]);



    const { confirmed, recovered, deaths, lastUpdate } = filteredData;

    return (
        <Layout>
            <div className="top-section">
                <img className="logo" src="images/logo.svg" width="230" />
                <p>ติดตามสถานะการณ์ผู้เชื้อไวรัส Covid-19 ในประเทศไทยและทั่วโลก</p>
            </div>
            <div className="filter-type-section">
                <FilterTypeButton
                    filterType={filterType}
                    setFilterType={setFilterType}
                />
            </div>
            <div className="covid-stats-section">
                <div className="row">
                    <div className="col-lg-4">
                        <Card
                            type="confirmed"
                            title="จำนวนผู้ติดเชื้อ"
                            number={confirmed?.value}
                            lastUpdate={lastUpdate}
                        />
                    </div>
                    <div className="col-lg-4">
                        <Card
                            className="float-shadow"
                            type="recovered"
                            title="จำนวนผู้รับรักษา"
                            number={recovered?.value}
                            lastUpdate={lastUpdate}
                        />
                    </div>
                    <div className="col-lg-4">
                        <Card
                            type="deaths"
                            title="จำนวนผู้เสียชีวิต"
                            number={deaths?.value}
                            lastUpdate={lastUpdate}
                        />
                    </div>
                </div>
            </div>
            <div className="covid-stats-section">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="covid-bar-chart-card">
                            <h5>🦠 การเพิ่มขึ้นของไวรัสทั่วโลก</h5>
                            <BarChart data={barChart} />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="covid-donut-chart-card">
                            <h5>อัตราส่วน</h5>
                            <DonutChart data={donutChart} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}