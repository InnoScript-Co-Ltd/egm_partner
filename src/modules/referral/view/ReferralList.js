import { AppMenu } from "../../../shares/AppMenu"
import { AppToolbar } from "../../../shares/AppToolbar"
import { KYCStatusMessage } from "../../../shares/messages/KYCStatusMessage"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateReferral } from "../entry/CreateReferral";
import { KYCSTATUS } from "../../../constants/config";
import { Notification } from "../../../shares/Notification";
import { referralService } from "../referralService";
import { referralPayload } from "../referralPayload";
import { endpoints } from "../../../constants/endpoints";
import moment from "moment";
import { Button } from "primereact/button";

export const ReferralList = () => {

    const [loading, setLoading] = useState([]);
    const { referrals } = useSelector(state => state.referral);
    const { profile } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const copyReferralLink = (id) => {
        const copyText = document.getElementById(id).innerHTML;
        navigator.clipboard.writeText(copyText);
    }

    const initloading = useCallback(async () => {
        setLoading(true);
        await referralService.index(dispatch);
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

                {profile && profile.kyc_status === KYCSTATUS.FULL_KYC && profile.status === "ACTIVE" && (
                    <div className="grid">
                        <div className="col-12">
                            <CreateReferral />
                        </div>
                    </div>
                )}

                <div className="grid">
                    <div className="col-12">
                        <DataTable
                            dataKey="id"
                            size="normal"
                            value={referrals ? referrals : []}
                            loading={loading}
                        >
                            {referralPayload.columns.map((column, index) => {
                                return (
                                    <Column
                                        style={{ minWidth: "250px" }}
                                        field={column.field}
                                        header={column.header}
                                        key={`referral_link_id_${index}`}
                                        body={(value) => {
                                            switch (column.field) {
                                                case "link":
                                                    return (
                                                        <div className="flex flex-row align-items-center justify-content-start">
                                                            <code id={value[column.field]}> {`agent.evanglobalmanagement.com/agent/register/${value[column.field]}`}  </code>
                                                            <Button icon="pi pi-copy" rounded text onClick={() => copyReferralLink(value[column.field])} />
                                                        </div>
                                                    )
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

            <Notification />
        </div>
    )
}