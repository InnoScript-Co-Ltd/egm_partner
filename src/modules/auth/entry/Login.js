import { useState } from "react";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { Card } from "primereact/card";
import { InputText } from 'primereact/inputtext';
import { payloadHandler } from "../../../helpers/handler";
import { authService } from "../authService";
import { useDispatch } from "react-redux";
import { Notification } from "../../../shares/Notification";
import { useNavigate } from "react-router-dom";
import LOGO from "../../../assets/images/egm_logo.png";

export const Login = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({
        email: "",
        password: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitLogin = async () => {
        setLoading(true);
        const result = await authService.login(payload, dispatch);
        if(result.status === 200) {
            navigate('/dashboard');
        }
        setLoading(false);
    }

    return (
        <div className="gird">
            <div className="row">
                <div className="col-12 mt-3">
                    <div className="flex flex-column align-items-center justify-content-center">
                        <Image
                            width="100px"
                            height="100px"
                            src={LOGO}
                            title="Evan Global Management"
                            alt="Evan Global Management"
                        />
                        <span className="text-lg text-white"> Evan Global Management </span>

                        <div className="col-12 md:col-4 lg:col-4 mt-3 mb-3">
                            <Card
                                title="Partner Account Login"
                                subTitle={
                                    <span className="text-white text-sm font-light"> 
                                        We seek to build lasting partnerships underpinned by trust and credibility. 
                                    </span>
                                }
                            >
                                <div className="p-inputgroup mt-3">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-envelope"></i>
                                    </span>
                                    <InputText
                                        className="p-inputtext-sm"
                                        placeholder="Email"
                                        disabled={loading}
                                        value={payload.email}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'email', (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>

                                <div className="p-inputgroup mt-3">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-lock"></i>
                                    </span>
                                    <InputText
                                        type="password"
                                        className="p-inputtext-sm"
                                        placeholder="password"
                                        disabled={loading}
                                        value={payload.password}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'password', (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>

                                <div className="p-inputgroup mt-3">
                                    <div className="w-full flex flex-row align-items-center justify-content-end">
                                        <Button
                                            loading={loading}
                                            disabled={loading}
                                            className="p-button-sm primary-btn"
                                            label="Login"
                                            onClick={() => submitLogin()}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <Notification />
        </div>
    );
}