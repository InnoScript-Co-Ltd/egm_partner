import { AppMenu } from "../../../shares/AppMenu"
import { AppToolbar } from "../../../shares/AppToolbar"
import { KYCStatusMessage } from "../../../shares/messages/KYCStatusMessage"
import { Card } from "primereact/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bankAccountService } from "../bankAccountService";
import { bankAccountPayload } from "../bankAccountPayload";
import { useParams } from "react-router-dom";
import { bankTypes, KYCSTATUS } from "../../../constants/config";
import { InputText } from "primereact/inputtext";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Message } from "primereact/message";

export const UpdateBankAccount = () => {

    const [loading, setLoading] = useState([]);
    const [payload, setPayload] = useState(bankAccountPayload.update);
    const [selectedBank, setSelectedBank] = useState("");
    const [disableUpdate, setDisableUpdate] = useState(false);

    const { bankAccount } = useSelector(state => state.bankAccount);
    const { profile } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const params = useParams();

    const generalStatus = useRef(["ACTIVE", "DISABLE"]);

    const submitUpdate = async () => {
        setLoading(true);
        const reuslt = await bankAccountService.update(params.id, payload, dispatch);
        if (reuslt.status === 200) {
            await bankAccountService.show(dispatch, params.id);
        }
        setLoading(false);
    }

    /** Initialize Data Loading */
    const initloading = useCallback(async () => {
        setLoading(true);
        await bankAccountService.show(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params.id]);

    useEffect(() => {
        initloading();
    }, [initloading]);

    useEffect(() => {
        if (bankAccount) {
            const updateSelectedBank = bankTypes.filter(value => value.code === bankAccount.bank_type_label)[0];
            setSelectedBank(updateSelectedBank);
            setPayload(bankAccount);
        }
        if (bankAccount && bankAccount.deposit.length > 0) {
            setDisableUpdate(true);
        }

    }, [bankAccount]);

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

                    {profile && profile.kyc_status === KYCSTATUS.FULL_KYC && profile.status === 'ACTIVE' && (
                        <div className="col-12">
                            <Card
                                title="Update Bank Account"
                                subTitle="bank account information is required for deposit and withdrawal process."
                            >
                                <div className="grid">
                                    {bankAccount && bankAccount.status === 'DISABLE' && (
                                        <div className="col-12 mt-3">
                                            <Message
                                                className="w-full"
                                                severity="warn"
                                                content={
                                                    <p> Your bank account status is disable and can not be use for deposit and withdraw process. You can change bank account status to ACTIVE to use.</p>
                                                }
                                            >
                                            </Message>
                                        </div>
                                    )}
                                    <div className="col-12 md:col-3 lg:col-3 mt-3">
                                        <div className="p-inputgroup flex-1">
                                            <span className="p-inputgroup-addon">
                                                <i className="pi pi-user"></i>
                                            </span>
                                            <InputText
                                                placeholder="Bank Account Holder Name"
                                                disabled={loading || disableUpdate}
                                                value={payload.account_name ?? ""}
                                                onChange={(e) => payloadHandler(payload, e.target.value, 'account_name', (updatePayload) => {
                                                    setPayload(updatePayload);
                                                })}
                                            />
                                        </div>
                                        <ValidationMessage field={'account_name'} />
                                    </div>

                                    <div className="col-12 md:col-3 lg:col-3 mt-3">
                                        <div className="p-inputgroup flex-1">
                                            <span className="p-inputgroup-addon">
                                                <i className="pi pi-home"></i>
                                            </span>
                                            <Dropdown
                                                placeholder="Choose Bank Account Type"
                                                disabled={loading || disableUpdate}
                                                value={selectedBank}
                                                options={bankTypes}
                                                optionLabel="name"
                                                onChange={(e) => {
                                                    setSelectedBank(e.value);
                                                }}
                                            />
                                        </div>
                                        <ValidationMessage field={'bank_type'} />
                                    </div>

                                    <div className="col-12 md:col-3 lg:col-3 mt-3">
                                        <div className="p-inputgroup flex-1">
                                            <span className="p-inputgroup-addon">
                                                <i className="pi pi-credit-card"></i>
                                            </span>
                                            <InputText
                                                placeholder="Bank Account Number"
                                                disabled={loading || disableUpdate}
                                                value={payload.account_number ?? ""}
                                                onChange={(e) => payloadHandler(payload, e.target.value, 'account_number', (updatePayload) => {
                                                    setPayload(updatePayload);
                                                })}
                                            />
                                        </div>
                                        <ValidationMessage field={'account_number'} />
                                    </div>

                                    <div className="col-12 md:col-3 lg:col-3 mt-3">
                                        <div className="p-inputgroup flex-1">
                                            <span className="p-inputgroup-addon">
                                                <i className="pi pi-share-alt"></i>
                                            </span>
                                            <InputText
                                                placeholder="Branch Name"
                                                disabled={loading || disableUpdate}
                                                value={payload.branch ?? ""}
                                                onChange={(e) => payloadHandler(payload, e.target.value, 'branch', (updatePayload) => {
                                                    setPayload(updatePayload);
                                                })}
                                            />
                                        </div>
                                        <ValidationMessage field={'branch'} />
                                    </div>

                                    <div className="col-12 md:col-3 lg:col-3 mt-3">
                                        <div className="p-inputgroup flex-1">
                                            <span className="p-inputgroup-addon">
                                                <i className="pi pi-home"></i>
                                            </span>
                                            <Dropdown
                                                placeholder="Choose Account Status"
                                                disabled={loading}
                                                value={payload.status ?? ""}
                                                options={generalStatus.current}
                                                onChange={(e) => {
                                                    payloadHandler(payload, e.value, 'status', (updatePayload) => {
                                                        setPayload(updatePayload)
                                                    })
                                                }}
                                            />
                                        </div>
                                        <ValidationMessage field={'status'} />
                                    </div>

                                    <div className="col-12 md:col-9 lg:col-9 mt-3">
                                        <div className="p-inputgroup flex-1">
                                            <span className="p-inputgroup-addon">
                                                <i className="pi pi-warehouse"></i>
                                            </span>
                                            <InputText
                                                placeholder="Bank Address"
                                                disabled={loading || disableUpdate}
                                                value={payload.branch_address ?? ""}
                                                onChange={(e) => payloadHandler(payload, e.target.value, 'branch_address', (updatePayload) => {
                                                    setPayload(updatePayload);
                                                })}
                                            />
                                        </div>
                                        <ValidationMessage field={'branch_address'} />
                                    </div>

                                    <div className="col-12 mt-3">
                                        <div className="flex flex-row justify-content-end align-items-center">
                                            <Button
                                                label="Update"
                                                disabled={loading}
                                                loading={loading}
                                                onClick={() => submitUpdate()}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}