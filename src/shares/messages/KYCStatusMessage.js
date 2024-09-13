import { useState } from "react";
import { useSelector } from "react-redux";
import { KYCSTATUS } from "../../constants/config";
import { Message } from 'primereact/message';
import { Card } from 'primereact/card';

export const KYCStatusMessage = () => {

    const [loading, setLoading] = useState(false);

    const { profile } = useSelector(state => state.auth);

    const KYC_CHECKING_CONTNET = () => {
        return (
            <div className="w-full">
                <span className="text-white">
                    Currently, your KYC status is <code> CHECKING</code> . 
                    We are checking your KYC information and this process will take 24 hours. 
                    If you have any questions or helps, please contact <a className="text-light" href="mailto:support@evanglobalmanagement.com">support@evanglobalmanagement.com</a>
                </span>
            </div>
        )
    }

    return (
        <>
            {profile && profile.kyc_status === KYCSTATUS.CHECKING && (
                <Message
                    className="mt-3 mb-3"
                    content={KYC_CHECKING_CONTNET}
                    style={{
                        width: "100%",
                        border: 'solid #eec137',
                        borderWidth: '0 0 0 6px',
                        fontWeight: "500"
                    }}
                    severity="warn"
                />
            )}
        </>
    )
}