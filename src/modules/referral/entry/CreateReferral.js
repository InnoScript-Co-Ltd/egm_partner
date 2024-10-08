import { useEffect, useState } from "react"
import { referralService } from "../referralService";
import { useDispatch, useSelector } from "react-redux";
import { setErrors, setNotification } from "../../../shares/shareSlice";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/paths";
import { KYCSTATUS, ReferralLinkType } from "../../../constants/config";

export const CreateReferral = () => {

    const [loading, setLoading] = useState(false);
    const [referral, setReferral] = useState(null);

    const { profile } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const generateReferral = async (type) => {
        setLoading(true);

        if (type === ReferralLinkType.COMMISSION_REFERRAL) {
            const result = await referralService.commissionReferralStore(dispatch);

            if (result.status === 200) {
                await referralService.index(dispatch);
                setReferral(`agent.evanglobalmanagement.com/agent/register/${result.data.link}`);
            }
        }

        if (type === ReferralLinkType.LEVEL_FOUR_REFERRAL) {
            const result = await referralService.levelFourReferralStore(dispatch);

            if (result.status === 200) {
                await referralService.index(dispatch);
                setReferral(`agent.evanglobalmanagement.com/agent/register/${result.data.link}`);
            }
        }

        setLoading(false);
    }

    const copyReferralLink = () => {
        const copyText = document.getElementById("referral-link").innerHTML;
        navigator.clipboard.writeText(copyText);
    }

    const DepositFirst = () => {
        return (
            <div className="w-full">
                <p>
                    First, you need to deposit at least 10,000,000 MMK and you can generate main agent referral links.
                    Depoist's ROI (Return on investment) rate is 15% and referral commission is 1% total deposit amount on
                    main agent or sub agent.
                </p>

                <Button
                    label="Deposit"
                    onClick={() => navigate(paths.deposit)}
                />
            </div>
        )
    }

    useEffect(() => {
        dispatch(setNotification(null));
        dispatch(setErrors(null));
    }, [dispatch]);

    return (
        <Card
            title="Generate Referral Link"
        >
            <div className="flex flex-column align-items-start justify-content-center">
                {referral && (
                    <code onClick={() => copyReferralLink()}>
                        <span id="referral-link"> {referral} </span>
                        <Button icon="pi pi-copy" rounded text />
                    </code>

                )}


                {profile && profile.deposit.length > 0 && profile.kyc_status === KYCSTATUS.FULL_KYC && profile.status === "ACTIVE" && (
                    <div>
                        <Button
                            size="small"
                            className="mt-3"
                            label="Create Level Four Referral Link"
                            icon="pi pi-share-alt"
                            severity="warning"
                            disabled={loading}
                            loading={loading}
                            onClick={() => generateReferral(ReferralLinkType.LEVEL_FOUR_REFERRAL)}
                        />

                        <Button
                            size="small"
                            className="mt-3 ml-3"
                            label="Create Commission Referral Link"
                            icon="pi pi-share-alt"
                            severity="warning"
                            disabled={loading}
                            loading={loading}
                            onClick={() => generateReferral(ReferralLinkType.COMMISSION_REFERRAL)}
                        />
                    </div>
                )}

            </div>

            {profile && profile.deposit.length === 0 && (
                <Message
                    content={<DepositFirst />}
                    severity="warn"
                />
            )}
        </Card>
    )
}