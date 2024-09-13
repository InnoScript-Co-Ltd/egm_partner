import { useEffect, useState } from "react"
import { referralService } from "../referralService";
import { useDispatch, useSelector } from "react-redux";
import { setErrors, setNotification } from "../../../shares/shareSlice";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/paths";

export const CreateReferral = () => {

    const [loading, setLoading] = useState(false);

    const { profile } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitCreate = async () => {
        setLoading(true);
        await referralService.store(dispatch);
        setLoading(false);
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
            subTitle="First, you need to deposit at least 10,000,000 MMK and you can generate main agent referral link."
        >
            {profile && profile.deposit.length === 0 && (
                <Message
                    content={<DepositFirst />}
                    severity="warn"
                />
            )}
        </Card>
    )
}