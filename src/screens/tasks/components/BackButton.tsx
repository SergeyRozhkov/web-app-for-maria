import {useHistory} from "react-router-dom";
import {Button} from "@mui/material";

const BackButton = () => {
  const history = useHistory();

  const onClick = () => {
    history.push('/');
  }

  return <Button style={{position: 'absolute', left: 16, top: 16}} onClick={onClick}>
    Все задачи
  </Button>
}

export default BackButton;
