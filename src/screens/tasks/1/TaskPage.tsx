import React, {useState} from 'react';
import Grandmother1 from './imgs/grandmother1.png';
import Grandmother2 from './imgs/grandmother2.png';
import Grandmother3 from './imgs/grandmother3.png';
import Grandmother4 from './imgs/grandmother4.png';
import {Box, Button, Typography} from "@mui/material";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import immer from "immer";
import BackButton from "../components/BackButton";

const shadowRight = '5px 5px 30px 4px green'
const shadowNotRight = '5px 5px 30px 4px red'

const bySplitTag = '@@';
const text = `Ба́бушка выме́шивает те́сто.${bySplitTag} Она́ кладёт я́годную начи́нку на те́сто и ле́пит пирожки́.${bySplitTag} Пирожки́ бу́дут пе́чься в духо́вке.${bySplitTag} Ба́бушка и внук бу́дут пить чай со вку́сными пирожка́ми.`;

type PictureConfig = { rightIndex: number, imgSrc: any };
const defaultList: ReadonlyArray<PictureConfig> = [
  {rightIndex: 3, imgSrc: Grandmother4},
  {rightIndex: 0, imgSrc: Grandmother1},
  {rightIndex: 2, imgSrc: Grandmother3},
  {rightIndex: 1, imgSrc: Grandmother2},
]

const TaskPage = () => {
  const [playState, setPlayState] = useState<{
    isOrderReady: boolean;
    showSentenceCount: number;
    pictures: (PictureConfig & { fixed: boolean; showRed: boolean })[]
  }>({
    isOrderReady: false,
    showSentenceCount: 0,
    pictures: defaultList.map(x => ({...x, fixed: false, showRed: false}))
  })

  const resultSentences = text.split(bySplitTag).filter((_, index) => index < playState.showSentenceCount);
  const resultText = resultSentences.join('');

  const happyEnd = !playState.pictures.some(x => !x.fixed);

  const handleDrop = (droppedItem: any) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    const updatedList = [...playState.pictures];
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    setPlayState({
      ...playState,
      pictures: updatedList.map(x => ({...x, showRed: false})),
    });
  };

  const getShadow = (index: number) => {
    if (playState.pictures[index].fixed) {
      return shadowRight;
    }
    if (playState.pictures[index].showRed) {
      return shadowNotRight;
    }
    return undefined;
  }

  const next = () => {
    if (!playState.isOrderReady) {
      setPlayState({
        ...playState,
        isOrderReady: true,
        showSentenceCount: 1,
      })
      return;
    }

    const isCheckPicture = () => {
      const fixedCount = playState.pictures.filter(x => x.fixed).length;
      return fixedCount < playState.showSentenceCount;
    }
    if (isCheckPicture()) {
      const firstNotFixed = playState.pictures.find(x => !x.fixed);
      const firstNotFixedIndex = playState.pictures.findIndex(x => !x.fixed);
      if (firstNotFixed == null) {
        return;
      }
      if (firstNotFixedIndex === firstNotFixed.rightIndex) {
        setPlayState(immer(playState, draft => {
          draft.showSentenceCount = draft.showSentenceCount + 1;
          draft.pictures[firstNotFixedIndex].fixed = true;
          draft.pictures[firstNotFixedIndex].showRed = false;
          return draft;
        }))
      } else {
        setPlayState(immer(playState, draft => {
          draft.pictures[firstNotFixedIndex].showRed = true;
          return draft;
        }))
      }
    } else {
      setPlayState(immer(playState, draft => {
        draft.showSentenceCount = draft.showSentenceCount + 1;
        return draft;
      }))
    }
  }

  return (
    <Box height={'100%'} display={'flex'} justifyContent={"space-around"} pt={8}>
      <BackButton/>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} width={1200} minHeight={600}>
        <Box display={'flex'} flexDirection={'column'}>
          <Box>
            <Typography variant={'h3'}
                        fontWeight={'700'}>{!playState.isOrderReady ? 'Соста́вь карти́нки в пра́вильной после́довательности.' : 'Чита́й текст и проверя́й себя́.'}</Typography>
          </Box>
          <Box>
            <DragDropContext onDragEnd={handleDrop}>
              <Droppable droppableId="list-container" direction={'horizontal'}>
                {(provided) => (
                  <Box
                    mt={4}
                    display={'flex'}
                    justifyContent={'space-between'}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {playState.pictures.map((item, index) => {
                      const imgComponent = <img src={item.imgSrc} width={250} style={{
                        boxShadow: getShadow(index),
                        cursor: !item.fixed ? 'pointer' : undefined
                      }}/>;

                      return !item.fixed ? (
                        <Draggable key={item.rightIndex} draggableId={item.rightIndex.toString()} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                            >
                              {imgComponent}
                            </div>
                          )}
                        </Draggable>
                      ) : imgComponent;
                    })}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
          <Box mt={4}>
            <Typography variant={'h5'}>{resultText}</Typography>
          </Box>
        </Box>
        {!happyEnd && (
          <Box display={'flex'} justifyContent={'flex-end'} mt={6} py={3}>
            <Button variant={'contained'} onClick={next}>
              Далее
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TaskPage;
