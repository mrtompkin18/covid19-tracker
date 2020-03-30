import { useState, useEffect } from "react";
import _ from "lodash";
import Loader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

import Layout from "./components/Layout";
import FilterTypeButton from "./components/FilterTypeButton"
import Card from "./components/Card";
import BarChart from "../common/BarChart";
import DonutChart from "../common/DonutChart";

import { FILTER_TYPE, transformBarData, transformDonutData } from "../common";
import * as API from "./api/covid.api";

const override = css`
  display: block;
  position:absolute;
  top:50%;
  left:50%;
  opacity: 0.4;
  transform: translate(-50%,-50%);
`;

function Index() {
    //State
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState(FILTER_TYPE.GLOBAL);
    const [filteredData, setFilteredData] = useState({});
    const [covid, setCovid] = useState({ thailand: {}, global: {} });
    const [barChart, setBarchart] = useState({});
    const [donutChart, setDonutchart] = useState({});

    const fetchData = async () => {
        const [covidThai, covidGlobal, covidDaily] = await Promise.all([
            API.covidThai(),
            API.covidGlobal(),
            API.covidDaily()
        ]);

        setBarchart(transformBarData(covidDaily.data));

        setCovid({
            thailand: covidThai.data,
            global: covidGlobal.data,
        });

        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        const { thailand, global } = covid;
        let data = {};
        switch (filterType) {
            case FILTER_TYPE.THAILAND:
                data = thailand;
                break;
            case FILTER_TYPE.GLOBAL:
                data = global;
                break;
        }
        setFilteredData(data);
        setDonutchart(transformDonutData(data));
    }, [filterType, covid]);

    const renderFilterTypeBtn = () => {
        return (
            <div className="filter-type-section">
                <FilterTypeButton
                    filterType={filterType}
                    setFilterType={setFilterType}
                />
            </div>
        )
    }

    const renderChartSection = () => {
        return (
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
        )
    }

    const renderCardSection = () => {
        const { confirmed, recovered, deaths, lastUpdate } = filteredData;

        return (
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
        )
    }

    if (loading) {
        return (
            <Loader
                size={40}
                css={override}
                color="white"
            />
        )
    }

    return (
        <Layout>
            <div className="top-section">
                <img className="logo" src="images/logo.png" width="230" />
                <p>ติดตามสถานะการณ์ผู้เชื้อไวรัส Covid-19 ในประเทศไทยและทั่วโลก</p>
            </div>
            {renderFilterTypeBtn()}
            {renderCardSection()}
            {renderChartSection()}
        </Layout>
    )
}

export default Index;