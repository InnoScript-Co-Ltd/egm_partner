
import React, { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';

export const Notification = () => {
    const toast = useRef(null);
    const { notification } = useSelector(state => state.share);

    useEffect(() => {
        if (notification) {
            toast.current.show(notification);
        }
    }, [notification]);

    return (
        <>
            {notification && (
                <Toast ref={toast} />
            )}
        </>
    )
}