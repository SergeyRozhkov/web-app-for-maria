import React from 'react';
import {Box, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@mui/styles";

const tasks: ReadonlyArray<{ name: string, path: string }> = [
  {name: 'Задание 1. Работа по серии картинок', path: '/tasks1',},
  {name: 'Задание 2. Отгадывание персонажа', path: '/tasks2',},
  {name: 'Задание 3. Удаление лишней информации из текста', path: '/tasks3',},
  {name: 'Задание 4. Удаление лишней информации из описания картинки', path: '/tasks4',},
  {name: 'Задание 5. Дополнение рассказа по заданному началу', path: '/tasks5',},
  {name: 'Задание 6. Дополнение рассказа по заданному концу', path: '/tasks6',},
]

const MainPage = () => {
  const styles = useStyles();
  const history = useHistory();

  return (
    <Box display={'flex'} justifyContent={"space-around"} pt={10}>
      <Box display={'flex'} flexDirection={'column'} width={600}>
        <Typography variant={'h3'} fontWeight={'700'} px={1.5}>Задания:</Typography>
        <Box display={'flex'} flexDirection={'column'} mt={3}>
          {tasks.map(({path, name}) => (
            <Box px={1.5} py={1.5} className={styles.buttonContainer} onClick={() => history.push(path)}>
              <Typography variant={'h6'}>
                {name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    buttonContainer: {
      cursor: 'pointer',
      borderRadius: 4,
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,.12)',
      }
    }
  }
})

export default MainPage;
