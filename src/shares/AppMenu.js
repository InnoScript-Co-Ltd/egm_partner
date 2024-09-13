import { useNavigate } from 'react-router-dom';
import { paths } from '../constants/paths';
import { Image } from 'primereact/image';
import LOGO from "../assets/images/egm_logo.png";

export const AppMenu = () => {

    const navigate = useNavigate();

    const menu = [
        {
            label: "Dashboard",
            icon: "pi-gauge",
            path: paths.dashboard
        },
        {
            label: "Deposit",
            icon: "pi-credit-card",
            path: ""
        },
        {
            label: "Bank",
            icon: "pi-credit-card",
            path: paths.bank
        },
        {
            label: "Logout",
            icon: "pi-power-off",
            path: ""
        }
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
        </div>
    )
}