import React, {useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import Action1Img from './imgs/action1.png';
import Action2Img from './imgs/action2.png';
import BackButton from "../components/BackButton";

const rightActionIndex = 0;

const shadowSelection = '5px 5px 30px 4px grey'
const shadowRight = '5px 5px 30px 4px green'
const shadowNotRight = '5px 5px 30px 4px red'

const TaskPage = () => {
  const [playState, setPlayState] = useState<{
    isRead: boolean,
    showTextRest: boolean,
    selectedIndex: number,
    doneAnswer: boolean,
  }>({
    isRead: false,
    selectedIndex: -1,
    showTextRest: false,
    doneAnswer: false,
  })

  const happyEnd = playState.doneAnswer && playState.selectedIndex === rightActionIndex;

  const changeSelectedIndex = (index: number) => {
    if (happyEnd) {
      return;
    }

    setPlayState(s => {
      if (s.selectedIndex === index) {
        return s;
      }

      return {
        ...s,
        doneAnswer: false,
        selectedIndex: index,
      }
    })
  }

  const getShadow = (index: number): string | undefined => {
    if (playState.selectedIndex !== index) {
      return undefined;
    }
    if (playState.doneAnswer) {
      if (index === rightActionIndex) {
        return shadowRight;
      } else {
        return shadowNotRight;
      }
    }
    return shadowSelection;
  }

  const next = () => {
    if (!playState.isRead) {
      setPlayState({
        ...playState,
        isRead: true,
      })
      return;
    } else {
      if (!playState.showTextRest) {
        setPlayState({
          ...playState,
          showTextRest: true,
        })
        return;
      } else {
        setPlayState({
          ...playState,
          doneAnswer: true,
        })
        return;
      }
    }
  }

  const disable = (playState.isRead && playState.selectedIndex < 0);

  return (
    <Box height={'100%'} display={'flex'} justifyContent={"space-around"} pt={8}>
      <BackButton/>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} width={1200} minHeight={500}>
        <Box display={'flex'} flexDirection={'column'}>
          <Box>
            <Typography variant={'h3'} fontWeight={'700'}>{!playState.isRead ? 'Прочита́й текст.' : 'Подбери́ нача́ло для т́екста.'}</Typography>
          </Box>
          <Box pt={4}>
            <Typography display={'inline'} variant={'h5'}>
              {!playState.showTextRest ? '… . Лёша и его́ пёс Макс побежа́ли домо́й. До́ма Лёша переоде́лся в суху́ю оде́жду. Макс отряхну́лся от воды́. Ма́льчик и пёс согре́лись.' : 'Начался́ си́льный дождь. Лёша и его́ пёс Макс побежа́ли домо́й. До́ма Лёша переоде́лся в суху́ю оде́жду. Макс отряхну́лся от воды́. Ма́льчик и пёс согре́лись.'}
            </Typography>
          </Box>
          {playState.isRead && (
            <Box display={'flex'} mt={6}>
              <Box style={{boxShadow: getShadow(0), cursor: !happyEnd ? 'pointer': undefined}} mx={8} flexGrow={1} display={'flex'} justifyContent={'center'} alignItems={'center'} onClick={() => changeSelectedIndex(0)}>
                <img src={Action1Img} />
              </Box>
              <Box style={{boxShadow: getShadow(1), cursor: !happyEnd ? 'pointer': undefined}} mx={8} flexGrow={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <img src={Action2Img} onClick={() => changeSelectedIndex(1)}/>
              </Box>
            </Box>
          )}
        </Box>
        {!happyEnd && (
          <Box display={'flex'} justifyContent={'flex-end'} mt={6} py={3}>
            <Button variant={'contained'} disabled={disable} onClick={next}>
              Далее
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TaskPage;
