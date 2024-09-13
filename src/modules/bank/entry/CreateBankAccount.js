import { useState } from "react"
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { bankTypes, KYCSTATUS } from "../../../constants/config";
import { bankAccountPayload } from "../bankAccountPayload";
import { payloadHandler } from "../../../helpers/handler";
import { bankAccountService } from "../bankAccountService";
import { ValidationMessage } from "../../../shares/ValidationMessage";

export const CreateBankAccount = () => {

    const [loading, setLoading] = useState(false);
    const [selectedBank, setSelectedBank] = useState("");
    const [payload, setPayload] = useState(bankAccountPayload.create);

    const { profile } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const submitStore = async () => {
        setLoading(true);

        const updatePayload = { ...payload };
        updatePayload.bank_type = selectedBank.name;
        updatePayload.bank_type_label = selectedBank.code;
        updatePayload.partner_id = profile.id;

        const result = await bankAccountService.store(updatePayload, dispatch);

        if(result.status === 200) {
            await bankAccountService.index(dispatch);
        }
        setLoading(false);
    }

    return (
        <>
            {profile && profile.kyc_status === KYCSTATUS.FULL_KYC && (
                <Card
                    title="Create Bank Account"
                    subTitle="bank account information is required for deposit and withdraw process."
                >
                    <div className="grid">
                        <div className="col-12 md:col-4 lg:col-4 mt-3">
                            <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <InputText
                                    placeholder="Bank Account Holder Name"
                                    disabled={loading}
                                    value={payload.account_name}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'account_name', (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field={'account_name'} />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 mt-3">
                            <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-home"></i>
                                </span>
                                <Dropdown
                                    placeholder="Choose Bank Account Type"
                                    disabled={loading}
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

                        <div className="col-12 md:col-4 lg:col-4 mt-3">
                            <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-credit-card"></i>
                                </span>
                                <InputText
                                    placeholder="Bank Account Number"
                                    disabled={loading}
                                    value={payload.account_number}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'account_number', (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field={'account_number'} />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 mt-3">
                            <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-share-alt"></i>
                                </span>
                                <InputText
                                    placeholder="Branch Name"
                                    disabled={loading}
                                    value={payload.branch}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'branch', (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                            </div>
                            <ValidationMessage field={'branch'} />
                        </div>

                        <div className="col-12 md:col-8 lg:col-8 mt-3">
                            <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-warehouse"></i>
                                </span>
                                <InputText
                                    placeholder="Bank Address"
                                    disabled={loading}
                                    value={payload.branch_address}
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
                                    label="Create"
                                    disabled={loading}
                                    loading={loading}
                                    onClick={() => submitStore()}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            )}
        </>
    )
}