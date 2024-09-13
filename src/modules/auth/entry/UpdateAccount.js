import { InputText } from "primereact/inputtext";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authPayload } from "../authPayload";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { Notification } from "../../../shares/Notification";
import { authService } from "../authService";

export const UpdateAccount = () => {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(authPayload.account);

    const { profile } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const updateSubmit = async () => {
        confirmDialog({
            message: "Are you sure you want to change account information?",
            header: 'Confirm Password',
            defaultFocus: 'accept',
            accept: async () => {
                setLoading(true);
                await authService.updateAccount(payload, dispatch);
                setLoading(false);
            }
        });
    }

    useEffect(() => {
        if (profile) {
            setPayload(profile);
        }
    }, [profile]);

    return (
        <div className="grid">
            <div className="col-12 md:col-6 lg:col-6 mt-3">
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-phone"></i>
                    </span>
                    <InputText
                        placeholder="Enter your phone"
                        value={payload.phone ?? ""}
                        disabled={loading}
                        onChange={(e) => payloadHandler(payload, e.target.value, 'phone', (updatePayload) => {
                            setPayload(updatePayload);
                        })}
                    />
                </div>
                <ValidationMessage field="phone" />
            </div>

            <div className="col-12 md:col-6 lg:col-6 mt-3">
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-envelope"></i>
                    </span>
                    <InputText
                        placeholder="Enter your email address"
                        value={payload.email ?? ""}
                        disabled={loading}
                        onChange={(e) => payloadHandler(payload, e.target.value, 'email', (updatePayload) => {
                            setPayload(updatePayload);
                        })}
                    />
                </div>
                <ValidationMessage field="email" />
            </div>

            <div className="col-12 mt-3">
                <div className="w-full flex flex-row justify-content-end align-item-center">
                    <Button
                        label="Update"
                        loading={loading}
                        disabled={loading}
                        onClick={() => updateSubmit()}
                    />
                </div>
            </div>

            <Notification />
            <ConfirmDialog />
        </div>
    )
}