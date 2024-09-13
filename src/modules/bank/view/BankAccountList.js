import { AppMenu } from "../../../shares/AppMenu"
import { AppToolbar } from "../../../shares/AppToolbar"
import { KYCStatusMessage } from "../../../shares/messages/KYCStatusMessage"
import { CreateBankAccount } from "../entry/CreateBankAccount"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from "primereact/card";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bankAccountService } from "../bankAccountService";
import { bankAccountPayload } from "../bankAccountPayload";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../../constants/endpoints";

export const BankAccountList = () => {

    const [loading, setLoading] = useState([]);
    const [banks, setBanks] = useState([]);

    const { bankAccounts } = useSelector(state => state.bankAccount);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initloading = useCallback(async () => {
        setLoading(true);
        await bankAccountService.index(dispatch);
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        initloading();
    }, [initloading]);

    useEffect(() => {
        if (bankAccounts) {
            setBanks(bankAccounts);
        }
    }, [bankAccounts])
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

                <div className="grid">
                    <div className="col-12">
                        <CreateBankAccount />
                    </div>
                </div>

                <div className="grid">
                    <div className="col-12">
                        <Card
                            title="Bank Account List"
                            subTitle="You can manage bank account to enable / disable before bank account has no transcation records."
                        >
                            <DataTable
                                dataKey="id"
                                size="normal"
                                value={banks ? banks : []}
                                loading={loading}
                            >
                                {bankAccountPayload.columns.map((column, index) => {
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
                                                                style={{textDecoration: "underline", cursor: "pointer"}}
                                                                onClick={() => navigate(`/${endpoints.bankAccount}/${value["id"]}`)}
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
                    </div>
                </div>
            </div>
        </div>
    )
}