import React, {useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import immer from 'immer';
import Hero1 from './imgs/hero1.png';
import Hero2 from './imgs/hero2.png';

const bySplitTag = '@@';
const text = `Э́тот персона́ж ма́ленького ро́ста.${bySplitTag} Он живёт в го́роде.${bySplitTag} У него́ есть друг.${bySplitTag} У э́того персона́жа больши́е у́ши.`;

const AnswerRow = ({
                     values,
                     onClick,
                     disable
                   }: { values: boolean[], onClick: (index: number) => void, disable: boolean }) => {
  const outerHeight = 50;

  return <Box display={'flex'} height={outerHeight} m={1}>
    {values.map((value, index) => (
      <Box display={"flex"} justifyContent={'center'} alignItems={'center'} flexGrow={1} height={outerHeight} m={1}
           border={'2px solid gray'} bgcolor={value === true ? 'green' : 'transparent'}
           onClick={!disable ? () => onClick(index) : undefined} style={{cursor: !disable ? 'pointer' : undefined}}>
      </Box>
    ))}
  </Box>
}

type Answer = { hero1: boolean, hero2: boolean };

const TaskPage = () => {
  const [curPlayIndex, setCurPlayIndex] = useState(0);
  const [playState, setPlayState] = useState<{ text: string, answer: Answer, answerConfirm: boolean }[]>(
    text.split(bySplitTag).map(sentences => {
      return {
        text: sentences,
        answer: {hero1: false, hero2: false},
        answerConfirm: false
      }
    })
  )

  const curPlayState = playState[curPlayIndex];
  const anyAnswer = curPlayState != null && (curPlayState.answer.hero1 || curPlayState.answer.hero2);
  const happyEnd = curPlayState == null;

  const resultSentences = playState.filter((_, index) => index <= curPlayIndex).map(x => x.text);
  const resultText = resultSentences.join('');

  const resultAnswers = playState.filter((_, index) => index <= curPlayIndex).map(x => x.answer);

  return (
    <Box height={'100%'} display={'flex'} justifyContent={"space-around"} pt={8}>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} width={1200} minHeight={500}>
        <Box display={'flex'} flexDirection={'column'}>
          <Box>
            <Typography variant={'h3'} fontWeight={'700'}>Чита́й текст и выбира́й персона́жа.</Typography>
          </Box>
          <Box display={'flex'} mt={4}>
            <Box flexGrow={1} pr={8} flexBasis={'50%'}>
              <Typography variant={'h5'}>{resultText}</Typography>
            </Box>
            <Box flexGrow={1} display={'flex'} flexDirection={'column'} flexBasis={'50%'}>
              <Box display={'flex'} justifyItems={'end'}>
                <Box flexGrow={1} display={"flex"} justifyContent={'center'} alignItems={'center'} >
                  <img src={Hero1} height={250 * 0.7}/>
                </Box>
                <Box flexGrow={1} display={"flex"} justifyContent={'center'} alignItems={'center'} >
                  <img src={Hero2} height={220 * 0.7}/>
                </Box>
              </Box>
              {resultAnswers.map((an, anIndex) => {
                const click = (indexNumber: number) => {
                  const heroHumber = indexNumber + 1;
                  setPlayState(s => {
                    return immer(s, (draft) => {
                      // @ts-ignore
                      const currentValue = draft[anIndex].answer[`hero${heroHumber}`];
                      // @ts-ignore
                      draft[anIndex].answer[`hero${heroHumber}`] = !currentValue
                    })
                  })
                }
                return (
                  <AnswerRow values={Object.values(an)} onClick={click} disable={anIndex !== curPlayIndex}/>
                )
              })}
            </Box>
          </Box>
        </Box>
        {!happyEnd && (
          <Box display={'flex'} justifyContent={'flex-end'} py={3}>
            <Button variant={'contained'} disabled={!anyAnswer} onClick={() => {
              setPlayState(state => immer(state, draft => {
                  draft[curPlayIndex].answerConfirm = true;
                  setCurPlayIndex(state => state + 1);
                })
              )
            }}>
              Далее
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TaskPage;
