import Alert from "react-bootstrap/Alert";

function SuccessAlert(props) {
  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <Alert variant={props.alert.variant}>
          <strong>{props.alert.variant === 'danger'? 'Error': 'Success'}</strong> {props.alert.message}
        </Alert>
      )}
    </div>
  );
}

export default SuccessAlert;
