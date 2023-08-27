import React, { useState, useEffect } from 'react';

const DismissibleAlert = ({ message, duration, onDismiss }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onDismiss();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onDismiss]);

    return (
        visible && (
            <div className="fixed top-0 left-0 right-0 p-2 bg-blue-500 text-white text-center">
                { message }
            </div>
        )
    );
};

export default DismissibleAlert;
