import { useNavigate } from 'react-router-dom';
import { paths } from '../constants/paths';
import { Image } from 'primereact/image';
import LOGO from "../assets/images/egm_logo.png";
import { removeAllData } from '../libs/localstorage';

export const AppMenu = () => {

    const navigate = useNavigate();

    const logout = () => {
        removeAllData();
        navigate('/');
    }

    const menu = [
        {
            label: "Dashboard",
            icon: "pi-gauge",
            path: paths.dashboard
        },
        {
            label: "Agent",
            icon: "pi-user",
            path: paths.agent
        },
        {
            label: "Deposit",
            icon: "pi-credit-card",
            path: paths.deposit
        },
        {
            label: "Transactions",
            icon: "pi-history",
            path: paths.transaction
        },
        {
            label: "Bank",
            icon: "pi-credit-card",
            path: paths.bank
        },
        {
            label: "Referral",
            icon: "pi-share-alt",
            path: paths.referral
        },
    ];

    return (
        <div className="app-menu">
            <Image
                src={LOGO}
                width='40px'
                height='40px'
                style={{ marginTop: "20px", marginBottom: "20px" }}
            />

            {menu.map((value, index) => {
                return (
                    <div
                        key={`app_menu_id_${index}`}
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            borderBottom: "2px solid #222222"
                        }}>
                        <span
                            className="app-menu-item"
                            onClick={() => navigate(value.path)}
                        >
                            <i className={`pi ${value.icon}`}></i>
                        </span>
                        <small style={{ paddingBottom: "10px", fontSize: "10px" }}> {value.label} </small>
                    </div>
                )
            })}

            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "2px solid #222222"
                }}>
                <span
                    className="app-menu-item"
                    onClick={() => logout()}
                >
                    <i className="pi pi-power-off"></i>
                </span>
                <small style={{ paddingBottom: "10px", fontSize: "10px" }}> Logout </small>
            </div>
        </div>
    )
}