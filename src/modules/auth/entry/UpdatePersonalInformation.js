import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authPayload } from "../authPayload";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { Notification } from "../../../shares/Notification";
import { authService } from "../authService";

export const UpdatePersonalInformation = () => {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(authPayload.personal);

    const { profile } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const updateSubmit = async () => {
        setLoading(true);
        await authService.updatePersonalInfo(payload, dispatch);
        setLoading(false);
    }

    useEffect(() => {
        if (profile) {
            console.log(profile);
            setPayload(profile);
        }
    }, [profile]);

    return (
        <div className="grid">
            <div className="col-12 md:col-4 lg:col-4 mt-3">
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText
                        placeholder="username"
                        value={payload.username ?? ""}
                        disabled={loading}
                        onChange={(e) => payloadHandler(payload, e.target.value, 'username', (updatePayload) => {
                            setPayload(updatePayload);
                        })}
                    />
                </div>
                <ValidationMessage field="username" />
            </div>

            <div className="col-12 md:col-4 lg:col-4 mt-3">
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-exclamation-circle"></i>
                    </span>
                    <InputText
                        placeholder="Enter your first name"
                        value={payload.first_name ?? ""}
                        disabled={loading}
                        onChange={(e) => payloadHandler(payload, e.target.value, 'first_name', (updatePayload) => {
                            setPayload(updatePayload);
                        })}
                    />
                </div>
                <ValidationMessage field="first_name" />
            </div>

            <div className="col-12 md:col-4 lg:col-4 mt-3">
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-exclamation-circle"></i>
                    </span>
                    <InputText
                        placeholder="Enter your last name"
                        value={payload.last_name ?? ""}
                        disabled={loading}
                        onChange={(e) => payloadHandler(payload, e.target.value, 'last_name', (updatePayload) => {
                            setPayload(updatePayload);
                        })}
                    />
                </div>
                <ValidationMessage field="last_name" />
            </div>

            <div className="col-12 mt-3">
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-home"></i>
                    </span>
                    <InputText
                        placeholder="Enter your address"
                        value={payload.address ?? ""}
                        disabled={loading}
                        onChange={(e) => payloadHandler(payload, e.target.value, 'address', (updatePayload) => {
                            setPayload(updatePayload);
                        })}
                    />
                </div>
                <ValidationMessage field="address" />
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
        </div>
    )
}