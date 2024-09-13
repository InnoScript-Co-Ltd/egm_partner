import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { KYCSTATUS } from "../../../constants/config";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { depositPayloaad } from "../depositPayload";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { payloadHandler } from "../../../helpers/handler";
import { depositPackageService } from "../../depositPackage/depositPackageService";
import { bankAccountService } from "../../bank/bankAccountService";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { formBuilder } from "../../../libs/formBuilder";
import { transactionService } from "../../transaction/transactionService";
import { Notification } from "../../../shares/Notification";

export const CreateDeposit = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(depositPayloaad.createTransaction);
    const [depositPackage, setDepositPackage] = useState(null);
    const [depositAmountList, setDepositAmountList] = useState([]);
    const [selectedBankAccount, setSelectedBankAccount] = useState([]);
    const [merchantBankAccount, setMerchantBankAccount] = useState(null);

    const { profile } = useSelector(state => state.auth);
    const { depositPackages } = useSelector(state => state.depositPackage);
    const { activeBankAccounts } = useSelector(state => state.bankAccount);

    const dispatch = useDispatch();

    const initializeData = useCallback(async () => {
        setLoading(true);
        await depositPackageService.index(dispatch);
        await bankAccountService.activeIndex(dispatch);
        setLoading(false);
    }, [dispatch]);


    const submitCreateDeposit = async () => {
        setLoading(true);
        const updatePaylaod = formBuilder(payload, depositPayloaad.createTransaction)
        await transactionService.store(updatePaylaod, dispatch);
        setLoading(false);
    }

    useEffect(() => {
        initializeData();
    }, [initializeData]);

    return (
        <div className="grid">
            {merchantBankAccount && (
                <div className="col-12 mt-3">
                    <div className="merchant-bank-wrapper">
                        <span> Bank Account Holder Name - {merchantBankAccount.holder_name}</span>
                        <span> Bank Account Number - {merchantBankAccount.account_number}</span>
                        <span> Bank - {merchantBankAccount.bank_type_label}</span>
                    </div>
                </div>
            )}
            {profile && profile.kyc_status === KYCSTATUS.FULL_KYC && profile.status === 'ACTIVE' && (
                <div className="col-12 mt-3">
                    <Card
                        title="Create Deposit"
                        subTitle="choose your bank account type and sutitable merchant bank information will display. Payment transaction with merchant bank account and transaction screenshot need to upload in create deposit request form."
                    >
                        <div className="grid">
                            <div className="col-12 md:col-3 lg:col-3 mt-3">
                                <div className="p-inputgroup flex-1">
                                    <Dropdown
                                        placeholder="Choose Bank Account"
                                        disabled={loading || (activeBankAccounts && activeBankAccounts.length === 0) ? true : false}
                                        options={activeBankAccounts ? activeBankAccounts : []}
                                        value={selectedBankAccount}
                                        optionLabel="bank_type"
                                        onChange={(e) => payloadHandler(payload, e.target.value.id, 'sender_account_id', async (updatePayload) => {
                                            setLoading(true);
                                            const result = await getRequest(endpoints.merchantBankAccount, {
                                                columns: "bank_type_label",
                                                search: e.target.value.bank_type_label,
                                                filter: "status",
                                                value: "ACTIVE"
                                            }, dispatch);

                                            if (result.status === 200) {
                                                setMerchantBankAccount(result.data[0]);
                                                setSelectedBankAccount(e.target.value);

                                                const reqeustData = { ...updatePayload};

                                                if(result.data && result.data[0]) {
                                                    reqeustData.merchant_account_id = result.data[0].id;
                                                }
                                                    
                                                setPayload(reqeustData);
                                            }

                                            setLoading(false);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field={'sender_account_id'} />
                                <ValidationMessage field={'merchant_account_id'} />
                            </div>

                            <div className="col-12 md:col-3 lg:col-3 mt-3">
                                <div className="p-inputgroup flex-1">
                                    <Dropdown
                                        placeholder="Choose Deposit Package"
                                        disabled={loading || (depositPackages && depositPackages.length === 0) ? true : false}
                                        options={depositPackages ? depositPackages : []}
                                        optionLabel="name"
                                        value={depositPackage}
                                        onChange={(e) => payloadHandler(payload, e.target.value.id, 'package_id', (updatePayload) => {
                                            setDepositPackage(e.target.value);
                                            setDepositAmountList(e.target.value.deposit_amount);
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field={'package_id'} />
                            </div>

                            <div className="col-12 md:col-3 lg:col-3 mt-3">
                                <div className="p-inputgroup flex-1">
                                    <Dropdown
                                        placeholder="Choose Deposit Amount"
                                        disabled={loading || (depositAmountList && depositAmountList.length === 0) ? true : false}
                                        options={depositAmountList ? depositAmountList : []}
                                        value={payload.package_deposit_amount}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'package_deposit_amount', (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field={'package_deposit_amount'} />
                            </div>

                            <div className="col-12 md:col-3 lg:col-3 mt-3">
                                <div className="p-inputgroup flex-1">
                                    <InputText
                                        style={{
                                            border: "1px solid #959494",
                                            borderRadius: "5px"
                                        }}
                                        type="file"
                                        placeholder="Uplaod Transaction Screnshot"
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.files[0], 'transaction_screenshoot', (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field={'transaction_screenshoot'} />
                            </div>

                            <div className="col-12 mt-3">
                                <div className="flex flex-row justify-content-end align-items-center">
                                    <Button
                                        label="Create Deposit Request"
                                        disabled={loading}
                                        loading={loading}
                                        onClick={() => submitCreateDeposit()}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            <Notification />
        </div>
    )
}