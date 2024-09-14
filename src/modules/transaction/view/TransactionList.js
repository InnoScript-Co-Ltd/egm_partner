import { AppMenu } from "../../../shares/AppMenu"
import { AppToolbar } from "../../../shares/AppToolbar"
import { KYCStatusMessage } from "../../../shares/messages/KYCStatusMessage"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from "primereact/card";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { transactionService } from "../transactionService";
import { KYCSTATUS } from "../../../constants/config";
import { transactionPayload } from "../transactionPayload";
import { endpoints } from "../../../constants/endpoints";

export const TransactionList = () => {

    const [loading, setLoading] = useState([]);
    const [transactionType, setTransactionType] = useState("DEPOSIT");
    const { transactions } = useSelector(state => state.transaction);
    const { profile } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initloading = useCallback(async () => {
        setLoading(true);
        await transactionService.index(dispatch, {
            filter: "transaction_type",
            value: transactionType
        });
        setLoading(false);
    }, [dispatch, transactionType]);

    useEffect(() => {
        initloading();
    }, [initloading]);

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

                {profile && profile.kyc_status === KYCSTATUS.FULL_KYC && profile.status === 'ACTIVE' && (
                    <div className="grid">
                        <div className="col-12 mt-3">
                            {transactions && (
                                <Card
                                    title="Transaction Record History"
                                    subTitle="transaction types - [DEPOSIT_PENDING, DEPOSIT_PAYMENT_ACCEPTED, REJECT]"
                                >
                                    <DataTable
                                        dataKey="id"
                                        size="normal"
                                        value={transactions ? transactions : []}
                                        loading={loading}
                                    >
                                        {transactionPayload.columns.map((column, index) => {
                                            return (
                                                <Column
                                                    style={{ minWidth: "250px" }}
                                                    field={column.field}
                                                    header={column.header}
                                                    key={`bank_account_id_${index}`}
                                                    body={(value) => {
                                                        switch (column.field) {
                                                            case "account_number":
                                                                return (
                                                                    <span
                                                                        style={{ textDecoration: "underline", cursor: "pointer" }}
                                                                        onClick={() => navigate(`/${endpoints.transaction}/${value["id"]}`)}
                                                                    >
                                                                        {value[column.field]}
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
                                </Card>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}