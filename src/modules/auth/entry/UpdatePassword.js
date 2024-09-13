import { InputText } from "primereact/inputtext";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { authPayload } from "../authPayload";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { Button } from "primereact/button";
import { Notification } from "../../../shares/Notification";
import { authService } from "../authService";

export const UpdatePassword = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(authPayload.updatePassword);

    const dispatch = useDispatch();

    const submitUpdate = async () => {
        setLoading(true);
        await authService.changePassword(payload, dispatch);
        setLoading(false);
    }

    return (
        <div className="grid">
            <div className="col-12 md:col-4 lg:col-4 mt-3">
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-lock"></i>
                    </span>
                    <InputText
                        type="password"
                        placeholder="Enter your old password"
                        value={payload.old_password}
                        disabled={loading}
                        onChange={(e) => payloadHandler(payload, e.target.value, 'old_password', (updatePayload) => {
                            setPayload(updatePayload);
                        })}
                    />
                </div>
                <ValidationMessage field="old_password" />
            </div>

            <div className="col-12 md:col-4 lg:col-4 mt-3">
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-lock"></i>
                    </span>
                    <InputText
                        type="password"
                        placeholder="Enter your new password"
                        value={payload.password}
                        disabled={loading}
                        onChange={(e) => payloadHandler(payload, e.target.value, 'password', (updatePayload) => {
                            setPayload(updatePayload);
                        })}
                    />
                </div>
                <ValidationMessage field="password" />
            </div>

            <div className="col-12 md:col-4 lg:col-4 mt-3">
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-lock"></i>
                    </span>
                    <InputText
                        type="password"
                        placeholder="Enter your confirm password"
                        value={payload.password_confirmation}
                        disabled={loading}
                        onChange={(e) => payloadHandler(payload, e.target.value, 'password_confirmation', (updatePayload) => {
                            setPayload(updatePayload);
                        })}
                    />
                </div>
                <ValidationMessage field="password_confirmation" />
            </div>

            <div className="col-12 mt-3">
                <div className="flex flex-row align-items-center justify-content-end">
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