import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainPage from "./MainPage";
import {default as TaskPage1} from "./tasks/1/TaskPage";
import {default as TaskPage2} from "./tasks/2/TaskPage";
import {default as TaskPage3} from "./tasks/3/TaskPage";
import {default as TaskPage4} from "./tasks/4/TaskPage";
import {default as TaskPage5} from "./tasks/5/TaskPage";
import {default as TaskPage6} from "./tasks/6/TaskPage";

const routers: ReadonlyArray<{ path: string, Component: React.ComponentType<any> }> = [
  {path: '/tasks1', Component: TaskPage1},
  {path: '/tasks2', Component: TaskPage2},
  {path: '/tasks3', Component: TaskPage3},
  {path: '/tasks4', Component: TaskPage4},
  {path: '/tasks5', Component: TaskPage5},
  {path: '/tasks6', Component: TaskPage6},
  {path: '/', Component: MainPage},
]

const MainRouter = () => {

  return (
    <BrowserRouter>
      <Switch>
        {/*// @ts-ignore*/}
        {routers.map(({path, Component}) => (<Route path={path} component={Component}/>))}
        <Route>
          Ничего
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default MainRouter;
