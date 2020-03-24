import { useState, useEffect } from "react";
import { FILTER_TYPE } from "../../common";

export default function FilterTypeButton({ filterType, setFilterType }) {
    const [isGlobal, setIsGlobal] = useState(true);

    useEffect(() => {
        if (filterType === FILTER_TYPE.THAILAND) {
            setIsGlobal(false);
        } else {
            setIsGlobal(true);
        }
    }, [filterType]);

    const Button = ({ text, isActive, onClick }) => {
        const style = isActive ? "is-filter-btn-active" : "";

        return (
            <button
                type="button"
                className={`btn filter-type-btn ${style}`}
                onClick={onClick}>
                {text}
            </button>
        )
    }

    return (
        <div>
            <Button
                onClick={() => setFilterType(FILTER_TYPE.GLOBAL)}
                text="🌎 ทั่วโลก"
                isActive={isGlobal}
            />
            <Button
                onClick={() => setFilterType(FILTER_TYPE.THAILAND)}
                text="🇹🇭 ประเทศไทย"
                isActive={!isGlobal}
            />
        </div>
    )
}
