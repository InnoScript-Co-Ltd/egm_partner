import { Image } from "primereact/image"
import { Toolbar } from "primereact/toolbar"
import LOGO from "../assets/images/egm_logo.png";
import { Profile } from "./Profile";
import { useNavigate } from "react-router-dom";
import { paths } from "../constants/paths";
import { authService } from "../modules/auth/authService";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";

export const AppToolbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const mount = useCallback(async () => {
        await authService.profile(dispatch);
    },[dispatch]);


    useEffect(() => {
        mount();
    },[mount])

    const EndContent = () => {
        return (
            <div
                className="flex flex-row justify-content-start align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(paths.profile)}
            >
                <Profile />
            </div>
        )
    }
    return (
        <Toolbar
            end={EndContent}
        />
    )
}