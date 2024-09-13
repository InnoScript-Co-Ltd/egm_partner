import { AppMenu } from "../../../shares/AppMenu"
import { AppToolbar } from "../../../shares/AppToolbar"
import { KYCStatusMessage } from "../../../shares/messages/KYCStatusMessage"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from "primereact/card";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateReferral } from "../entry/CreateReferral";
import { KYCSTATUS } from "../../../constants/config";

export const ReferralList = () => {

    const [loading, setLoading] = useState([]);
    const { referral } = useSelector(state => state.referral);
    const { profile } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const initloading = useCallback(async () => {
    //     setLoading(true);
    //     await bankAccountService.index(dispatch);
    //     setLoading(false);
    // }, [dispatch]);

    // useEffect(() => {
    //     initloading();
    // }, [initloading]);

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

                {profile && profile.kyc_status === KYCSTATUS.FULL_KYC && profile.status === "ACTIVE" && (
                    <div className="grid">
                        <div className="col-12">
                            <CreateReferral />
                        </div>
                    </div>
                )}

                {/* 
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
                </div> */}
            </div>
        </div>
    )
}