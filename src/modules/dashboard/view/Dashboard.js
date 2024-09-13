import { AppToolbar } from "../../../shares/AppToolbar"
import { AppMenu } from "../../../shares/AppMenu";
import { KYCStatusMessage } from "../../../shares/messages/KYCStatusMessage";

export const Dashboard = () => {

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
            </div>
        </div>
    )
}