import React, {useState} from 'react';
import {Box, Typography} from "@mui/material";
import immer from "immer";
import Main from './imgs/main.png';

const bySplitTag = '@@';
const text = `Наступи́ла золота́я о́сень.${bySplitTag} На не́бе ту́чи.${bySplitTag} Со все́х дере́вьев уже упа́ли ли́стья.${bySplitTag} О́ля и Са́ша пошли́ на прогу́лку.${bySplitTag} Ребя́та взя́ли с собо́й соба́ку До́ру.${bySplitTag} В лесу́ О́ля и Са́ша уви́дели бе́лку.${bySplitTag} На де́реве сиде́л дя́тел.${bySplitTag} Снегири́ уже́ прилете́ли.`;

const TaskPage = () => {
  const [playState, setPlayState] = useState<{ text: string, removed: boolean }[]>(
    text.split(bySplitTag).map(sentences => {
      return {
        text: sentences,
        removed: false,
      }
    })
  );

  return (
    <Box height={'100%'} display={'flex'} justifyContent={"space-around"} pt={8}>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} width={1200} minHeight={500}>
        <Box display={'flex'} flexDirection={'column'}>
          <Box>
            <Typography variant={'h3'} fontWeight={'700'}>Рассмотри́ карти́нку. Убери́ ли́шние предложе́ния из те́кста.</Typography>
          </Box>
          <Box pt={4} display={'flex'}>
            <Box pr={6} flexGrow={1}>
              {playState.filter(x => !x.removed).map(playStateItem => {
                const onClick = () => {
                  setPlayState(state => immer(state, draft => {
                    draft.forEach(x => {
                      if (x.text === playStateItem.text) {
                        x.removed = true;
                      }
                    });
                  }))
                }
                return (
                  <Typography display={'inline'} variant={'h5'} onClick={onClick}
                              style={{cursor: 'pointer'}}>{playStateItem.text}</Typography>
                )
              })}
            </Box>
            <Box>
              <img src={Main} width={500} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskPage;
