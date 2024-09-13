import { useDispatch, useSelector } from "react-redux"
import { KYCSTATUS } from "../../../constants/config";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { authPayload } from "../authPayload";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { Calendar } from 'primereact/calendar';
import { Image } from "primereact/image";
import { endpoints } from "../../../constants/endpoints";
import { Button } from "primereact/button";
import { authService } from "../authService";
import { formBuilder } from "../../../libs/formBuilder";
import { Notification } from "../../../shares/Notification";
import DEFAULT_IMAGE from "../../../assets/images/default_image.png";
import moment from "moment";

export const UpdateKYC = () => {
    const [loading, setLoading] = useState(false);
    const { profile } = useSelector(state => state.auth);

    const [payload, setPayload] = useState(authPayload.kyc);
    const [nrcFront, setNrcFront] = useState(null);
    const [nrcBack, setNrcBack] = useState(null);

    const dispatch = useDispatch();

    const nrcBackHandler = (e) => {
        const objectUrl = URL.createObjectURL(e.target.files[0]);
        setNrcBack(objectUrl);
        payloadHandler(payload, e.target.files[0], 'nrc_back', (updatePayload) => {
            setPayload(updatePayload);
        })
    }

    const nrcFrontHandler = (e) => {
        const objectUrl = URL.createObjectURL(e.target.files[0]);
        setNrcFront(objectUrl);
        payloadHandler(payload, e.target.files[0], 'nrc_front', (updatePayload) => {
            setPayload(updatePayload);
        })
    }

    const submitUpdate = async () => {
        setLoading(true);
        const updatePayload = {...payload};
        updatePayload.dob = moment(payload.dob).format("MM/DD/YYYY");

        const reuslt = await authService.kycUpdate(formBuilder(updatePayload, authPayload.kyc), dispatch);

        if(reuslt.status === 200) {
            await authService.profile(dispatch);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (profile) {

            setNrcBack(profile.nrc_back ? `${endpoints.image}/${profile.nrc_back}` : DEFAULT_IMAGE);
            setNrcFront(profile.nrc_front ? `${endpoints.image}/${profile.nrc_front}` : DEFAULT_IMAGE);

            const updatePayload = { ...profile };
            updatePayload.nrc = profile.nrc;
            updatePayload.dob = moment(updatePayload.dob).toDate();
            updatePayload.nrc_back = null;
            updatePayload.nrc_front = null;

            setPayload(updatePayload);
        }
    }, [profile]);

    return (
        <div className="grid">
            <div className="col-12 md:col-6 lg:col-6 mt-3">
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-id-card"></i>
                    </span>
                    <InputText
                        placeholder="Enter your nrc number"
                        value={payload.nrc ?? ""}
                        disabled={loading || profile.kyc_status === 'FULL_KYC'}
                        onChange={(e) => payloadHandler(payload, e.target.value, 'nrc', (updatePayload) => {
                            setPayload(updatePayload);
                        })}
                    />
                </div>
                <ValidationMessage field="nrc" />
            </div>

            <div className="col-12 md:col-6 lg:col-6 mt-3">
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-calendar"></i>
                    </span>

                    <Calendar
                        placeholder="choose date of birth"
                        value={payload.dob ?? new Date()}
                        disabled={loading || profile.kyc_status === 'FULL_KYC'}
                        dateFormat="mm/dd/yy"
                        onChange={(e) => payloadHandler(payload, e.value, 'dob', (updatePayload) => {
                            console.log(e.value);
                            setPayload(updatePayload);
                        })}
                    />
                </div>
                <ValidationMessage field="dob" />
            </div>

            <div className="col-12 md:col-6 lg:col-6 mt-3">
                <Image
                    style={{ cursor: "pointer" }}
                    width="100%"
                    height="300px"
                    src={nrcFront ? nrcFront : DEFAULT_IMAGE}
                    onClick={() => {
                        if (profile.kyc_status === KYCSTATUS.CHECKING) {
                            document.getElementById('nrc_front').click();
                        }
                    }}
                />
                <input
                    id="nrc_front"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    style={{ display: "none" }}
                    onChange={(e) => nrcFrontHandler(e)}
                />
                <ValidationMessage field="nrc_front" />
            </div>

            <div className="col-12 md:col-6 lg:col-6 mt-3">
                <Image
                    style={{ cursor: "pointer" }}
                    width="100%"
                    height="300px"
                    src={nrcBack ? nrcBack : DEFAULT_IMAGE}
                    onClick={() => {
                        if (profile.kyc_status === KYCSTATUS.CHECKING) {
                            document.getElementById('nrc_back').click();
                        }
                    }}
                />
                <input
                    id="nrc_back"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    style={{ display: "none" }}
                    onChange={(e) => nrcBackHandler(e)}
                />
                <ValidationMessage field="nrc_back" />
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