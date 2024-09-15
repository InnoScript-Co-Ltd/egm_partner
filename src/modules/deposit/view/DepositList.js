import { useCallback, useEffect, useState } from "react";
import { AppMenu } from "../../../shares/AppMenu";
import { AppToolbar } from "../../../shares/AppToolbar";
import { KYCStatusMessage } from "../../../shares/messages/KYCStatusMessage";
import { useSelector } from "react-redux";
import { CreateDeposit } from "../entry/CreateDeposit";
import { DataTable } from "primereact/datatable";
import { depositPayloaad } from "../depositPayload";
import { Column } from "primereact/column";
import { paths } from "../../../constants/paths";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

export const DepositList = () => {

    const [loading, setLoading] = useState(false);
    const [deposit, setDeposit] = useState([]);

    const { profile } = useSelector(state => state.auth);

    const navigate = useNavigate();

    const initializeData = useCallback(() => {
        setLoading(true);
        setLoading(false);
    }, []);

    useEffect(() => {
        initializeData();
    }, [initializeData]);

    useEffect(() => {
        if (profile) {
            setDeposit(profile.deposit);
        }
    }, [profile]);

    return (
        <div className="app-wrapper">
            <AppMenu />

            <div className="app-content">
                <div className="grid">
                    <AppToolbar />
                </div>

                <div className="grid">
                    <div className="col-12">
                        <KYCStatusMessage />
                    </div>
                </div>

                <CreateDeposit />

                <div className="grid">
                    <div className="col-12">
                        <DataTable
                            dataKey="id"
                            size="normal"
                            value={deposit}
                            loading={loading}
                        >
                            {depositPayloaad.columns.map((column, index) => {
                                return (
                                    <Column
                                        style={{ minWidth: "250px" }}
                                        field={column.field}
                                        header={column.header}
                                        key={`deposit_id_${index}`}
                                        body={(value) => {
                                            switch (column.field) {
                                                case "deposit_amount":
                                                    return (
                                                        <span className="underline" style={{cursor: "pointer"}} onClick={() => navigate(`${paths.deposit}/${value['id']}`)}>
                                                            {numeral(value[column.field]).format('0,0')}
                                                        </span>
                                                    );
                                                case "roi_amount":
                                                    return (
                                                        <span> {numeral(value[column.field]).format('0,0')}</span>
                                                    );
                                                case "duration":
                                                    return (
                                                        <span> {moment(value['expired_at']).diff(moment(value['created_at']), 'month')} Months </span>
                                                    );
                                                case "created_at":
                                                    return (
                                                        <span>
                                                            {moment(value[column.field]).format("DD/MM/YYYY")}
                                                        </span>
                                                    );
                                                case "expired_at":
                                                    return (
                                                        <span>
                                                            {moment(value[column.field]).format("DD/MM/YYYY")}
                                                        </span>
                                                    );
                                                default:
                                                    return value[column.field];
                                            }
                                        }}
                                    />
                                )
                            })}
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    )
}