import { AppToolbar } from "../../../shares/AppToolbar"
import { AppMenu } from "../../../shares/AppMenu";
import { KYCStatusMessage } from "../../../shares/messages/KYCStatusMessage";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import numeral from "numeral";
import { dashboardService } from "../dashboardServices";
import { Card } from "primereact/card";

export const Dashboard = () => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const totalDeposit = useRef(0);
    const totalROI = useRef(0);

    const initializeLoading = useCallback(async () => {
        setLoading(true);
        const result = await dashboardService.index(dispatch);

        if (result.status === 200) {
            totalDeposit.current = numeral(result.data.total_deposit_amount).format('0,0');
            totalROI.current = numeral(result.data.total_roi_amount).format('0,0');
        }

        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        initializeLoading();
    }, [initializeLoading]);

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

                {!loading && (
                    <div className="grid">
                        <div className="col-12 md:col-3 lg:col-3 mt-3">
                            <Card
                                title="Total Deposit Amount"
                                subTitle="does not calculate expired depoist"
                            >
                                <div className="flex flex-row justify-content-start align-items-center">
                                    <i className="pi pi-wallet" style={{ fontSize: '2rem' }}></i>
                                    <span className="ml-3 text-xl font-bold"> {totalDeposit.current} MMK </span>
                                </div>
                            </Card>
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 mt-3">
                            <Card
                                title="Total ROI Amount"
                                subTitle="does not calculate expired depoist"
                            >
                                <div className="flex flex-row justify-content-start align-items-center">
                                    <i className="pi pi-wallet" style={{ fontSize: '2rem' }}></i>
                                    <span className="ml-3 text-xl font-bold"> {totalROI.current} MMK </span>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}