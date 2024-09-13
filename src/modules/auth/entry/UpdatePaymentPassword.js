import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { setErrors, setNotification } from "../../../shares/shareSlice";
import { InputText } from "primereact/inputtext";
import { authPayload } from "../authPayload";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { Button } from "primereact/button";
import { authService } from "../authService";
import { Notification } from "../../../shares/Notification";

export const UpdatePaymentPassword = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(authPayload.paymentPassword)

    const dispatch = useDispatch();

    const submitUpdate = async () => {
        setLoading(true);
        await authService.setPaymentPassword(payload, dispatch);
        setLoading(false);
    }
    useEffect(() => {
        dispatch(setNotification(null));
        dispatch(setErrors(null));
    }, [dispatch]);

    return (
        <div className="grid">
            <div className="col-12 md:col-4 lg:col-4 mt-3">
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-lock"></i>
                    </span>
                    <InputText
                        type="password"
                        placeholder="Enter your payment password"
                        value={payload.payment_password}
                        disabled={loading}
                        onChange={(e) => payloadHandler(payload, e.target.value, 'payment_password', (updatePayload) => {
                            setPayload(updatePayload);
                        })}
                    />
                </div>
                <ValidationMessage field="payment_password" />
            </div>

            <div className="col-12 md:col-4 lg:col-4 mt-3">
                <div className="flex flex-row align-items-center justify-content-start">
                    <Button
                        label="Update"
                        severity="info"
                        onClick={() => submitUpdate()}
                    />
                </div>
            </div>

            <Notification />
        </div>
    )
}