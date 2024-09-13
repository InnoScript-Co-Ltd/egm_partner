import { Image } from "primereact/image"
import DEFAULT_PHOTO from "../assets/images/default_image.png";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

export const Profile = () => {

    const { profile } = useSelector(state => state.auth);
    const [partner, setPartner] = useState(null);

    const mount = useCallback(async () => {
        if (profile) {
            setPartner(profile);
        }
    }, [profile]);

    useEffect(() => {
        mount();
    }, [mount]);

    return (
        <div className="flex flex-row align-items-start justify-content-start">
            {partner && (
                <Image
                    className="profile-photo"
                    src={DEFAULT_PHOTO}
                    width="40px"
                    height="40px"
                />
            )}

            {partner && (
                <div className="flex flex-column align-items-start justify-content-start">
                    <span className="text-sm text-white ml-2"> {`${partner.first_name} ${partner.last_name}`} </span>
                    <span className="text-sm ml-2 text-color"> {`${partner.email}`}</span>
                </div>
            )}
        </div>
    )
}