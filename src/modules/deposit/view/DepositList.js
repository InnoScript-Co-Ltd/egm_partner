import { useCallback, useEffect, useState } from "react";
import { AppMenu } from "../../../shares/AppMenu";
import { AppToolbar } from "../../../shares/AppToolbar";
import { KYCStatusMessage } from "../../../shares/messages/KYCStatusMessage";
import { useSelector } from "react-redux";
import { KYCSTATUS } from "../../../constants/config";
import { Card } from "primereact/card";
import { CreateDeposit } from "../entry/CreateDeposit";

export const DepositList = () => {

    const [loading, setLoading] = useState();
    const { profile } = useSelector(state => state.auth);

    const initializeData = useCallback(() => {
        setLoading(true);
        setLoading(false);
    }, []);

    useEffect(() => {
        initializeData();
    }, [initializeData]);

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

            </div>
        </div>
    )
}