import React, {useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import immer from "immer";

const bySplitTag = '@@';
const text = `У На́ди сего́дня день рожде́ния.${bySplitTag} У́тром На́дю поздра́вили роди́тели.${bySplitTag}
 Они́ подари́ли де́вочке котёнка.${bySplitTag} На́дя расстро́илась.${bySplitTag} Она́ всегда́ хоте́ла дома́шнего пито́мца.${bySplitTag}
  На́дя позвала́ друзе́й в го́сти.${bySplitTag} Они́ пошли́ в шко́лу.${bySplitTag} До́ма ребя́та игра́ли и е́ли торт.${bySplitTag} Бы́ло ску́чно.`;

const textRight = `У На́ди сего́дня день рожде́ния.${bySplitTag} У́тром На́дю поздра́вили роди́тели.${bySplitTag} Они́ подари́ли де́вочке котёнка.${bySplitTag} Она́ всегда́ хоте́ла дома́шнего пито́мца.${bySplitTag} На́дя позвала́ друзе́й в го́сти.${bySplitTag} До́ма ребя́та игра́ли и е́ли торт.`

const TaskPage = () => {
  const [checkText, setCheckText] = useState(false);
  const [playState, setPlayState] = useState<{ text: string, removed: boolean }[]>(
    text.split(bySplitTag).map(sentences => {
      return {
        text: sentences,
        removed: false,
      }
    })
  );

  const happyEnd = checkText;

  return (
    <Box height={'100%'} display={'flex'} justifyContent={"space-around"} pt={8}>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} width={1200} minHeight={500}>
        <Box display={'flex'} flexDirection={'column'}>
          <Box>
            <Typography variant={'h3'} fontWeight={'700'}>{!checkText ? 'Прочита́й текст и убери́ ли́шние предложе́ния.' : 'Прове́рь себя́.'}</Typography>
          </Box>
          <Box pt={4}>
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
                <Typography display={'inline'} variant={'h5'} onClick={!checkText ? onClick : undefined}
                            style={{cursor: !checkText ? 'pointer' : undefined}}>{playStateItem.text}</Typography>
              )
            })}
          </Box>
          {checkText && (
            <Box mt={12}>
              <Typography variant={'h4'} >Ве́рный текст:</Typography>
              <Box pt={2}>
                {textRight.split(bySplitTag).map(text => {
                  return <Typography display={'inline'} variant={'h5'}>{text}</Typography>
                })}
              </Box>
            </Box>
          )}
        </Box>
        {!happyEnd && (
          <Box display={'flex'} justifyContent={'flex-end'} py={3}>
            <Button variant={'contained'} onClick={() => setCheckText(true)}>
              Далее
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TaskPage;
