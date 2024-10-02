import { AppMenu } from "../../../shares/AppMenu"
import { AppToolbar } from "../../../shares/AppToolbar"
import { KYCStatusMessage } from "../../../shares/messages/KYCStatusMessage"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from "primereact/card";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KYCSTATUS } from "../../../constants/config";
import { endpoints } from "../../../constants/endpoints";
import { agentService } from "../agentService";
import { agentPayload } from "../agentPayload";

export const AgentList = () => {

    const [loading, setLoading] = useState([]);

    const { agents } = useSelector(state => state.agent);
    const { profile } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initloading = useCallback(async () => {
        setLoading(true);
        await agentService.index(null, dispatch);
        setLoading(false);
    }, [dispatch]);

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
                            {agents && (
                                <Card
                                    title="Agent List"
                                    subTitle="Agent Type [MAIN_AGENT, SUB_AGENT] | Referral Type [COMMISSION_REFERRAL, LEVEL_FOUR_REFERRAL]"
                                >
                                    <DataTable
                                        dataKey="id"
                                        size="normal"
                                        value={agents ? agents : []}
                                        loading={loading}
                                    >
                                        {agentPayload.columns.map((column, index) => {
                                            return (
                                                <Column
                                                    style={{ minWidth: "250px" }}
                                                    field={column.field}
                                                    header={column.header}
                                                    key={`bank_account_id_${index}`}
                                                    body={(value) => {
                                                        switch (column.field) {
                                                            case "first_name":
                                                                return (
                                                                    <span
                                                                        style={{ textDecoration: "underline", cursor: "pointer" }}
                                                                        onClick={() => navigate(`/${endpoints.agent}/${value["id"]}`)}
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