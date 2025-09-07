import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertDismissible({ variant, heading, message }) {
    const [showAlert, setShowAlert] = useState(true);

    if (showAlert) {
        return (
            <Alert variant={variant} onClose={() => setShowAlert(false)} dismissible>
                <Alert.Heading>{heading}</Alert.Heading>
                <p>{message}</p>
            </Alert>
        );
    }
    //return <Button onClick={() => setShowAlert(true)}>Show Alert</Button>;
}

export default AlertDismissible;
