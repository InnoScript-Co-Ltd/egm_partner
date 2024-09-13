import { useEffect, useState } from "react"
import { AppMenu } from "../../../shares/AppMenu"
import { AppToolbar } from "../../../shares/AppToolbar"
import { KYCStatusMessage } from "../../../shares/messages/KYCStatusMessage"
import { useDispatch, useSelector } from "react-redux"
import { Card } from "primereact/card"
import { TabMenu } from 'primereact/tabmenu';
import { UpdatePersonalInformation } from "../entry/UpdatePersonalInformation"
import { setErrors, setNotification } from "../../../shares/shareSlice"
import { UpdateAccount } from "../entry/UpdateAccount"
import { UpdateKYC } from "../entry/UpdateKYC"
import { UpdatePassword } from "../entry/UpdatePassword"
import { UpdatePaymentPassword } from "../entry/UpdatePaymentPassword"


export const AccountProfile = () => {

    const [activeIndex, setActiveIndex] = useState(0);

    const { profile } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const items = [
        { label: 'Personal', icon: 'pi pi-info-circle' },
        { label: 'Account', icon: 'pi pi-user' },
        { label: 'KYC', icon: 'pi pi-verified' },
        { label: 'Security', icon: 'pi pi-lock' },
        { label: 'Payment Password', icon: 'pi pi-credit-card' },
    ];

    useEffect(() => {
        dispatch(setNotification(null));
        dispatch(setErrors(null));
    },[dispatch]);

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

                    {profile && profile.status === 'ACTIVE' && (
                        <div className="col-12 mt-3">
                            <Card
                                title="Personal Information"
                                subTitle="You can change personal information everytime."
                            >
                                <TabMenu
                                    activeIndex={activeIndex}
                                    onTabChange={(e) => {
                                        setActiveIndex(e.index);
                                        dispatch(setNotification(null));
                                    }}
                                    model={items}
                                />

                                { profile && profile.status === 'ACTIVE' && activeIndex === 0 && <UpdatePersonalInformation /> }
                                { profile && profile.status === 'ACTIVE' && activeIndex === 1 && <UpdateAccount /> }
                                { profile && profile.status === 'ACTIVE' && activeIndex === 2 && <UpdateKYC /> }
                                { profile && profile.status === 'ACTIVE' && activeIndex === 3 && <UpdatePassword /> }
                                { profile && profile.status === 'ACTIVE' && activeIndex === 4 && <UpdatePaymentPassword /> }
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}