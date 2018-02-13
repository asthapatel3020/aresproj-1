/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree. 
 * 
 * @providesModule Root
 */

import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router, Route, Link, browserHistory, IndexRoute } from "react-router";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";

import configureStore from "../store/configureStore";

import Landing from "./Landing";
import Signup from "./Signup";

import App from "./App";


// routes
// import Users from './routes/users/users';
import Countries from './routes/countries/countries';
import AddCountry from './routes/countries/addCountry';
import EditCountry from './routes/countries/editCountry';
import Cities from './routes/cities/cities';
import AddCity from './routes/cities/addCity';
import EditCity from './routes/cities/editCity';
import UploadMatrix from './routes/uploadMatrix/uploadMatrix';
import Users from './routes/users/users';
import AddUser from './routes/users/addUser';
import Retailers from './routes/retailers/retailers';
import AddRetailers from './routes/retailers/addRetailers';
import EditRetailer from './routes/retailers/editRetailer';
import Shops from './routes/shops/shops';
import AddShop from './routes/shops/addShop';
import QuestionsWh from './routes/questionsWh/questionsWh';
import EditShop from './routes/shops/editShop';
import Question from './routes/questionsWh/question';
import QuestionsOther from './routes/questionsOther/questionsOther';
import EditQuestionWh from './routes/questionsWh/editQuestion';
import QuestionOther from './routes/questionsOther/question';
import EditQuestionOther from './routes/questionsOther/editQuestion';
import EditUser from './routes/users/editUser';
import DownloadMatrix from './routes/downloadMatrix/downloadMatrix';
import Reports from './routes/reports/reports';
import QuestionReports from './routes/questionReports/questionReports';
import QuestionDetails from './routes/questionReports/questionDetails';
import CommentReports from './routes/commentReports/commentReports';



const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);
var shallowCompare = require("react-addons-shallow-compare");
const name = "hell";
export default class Root extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <Provider store={store}>
        <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
          <Route path="/" component={App}>
            <IndexRoute
              component={Reports}
              pageName="reports"
              pageDescription="Отчеты"
            />

            
            
            <Route path="/signup" component={Signup} pageName="" pageDescription="" />
            

           


            <Route
                path="/countries"
                component={Countries}
                pageName="Страны"
                pageDescription="Страны"
              />
              <Route
                path="/countries/add"
                component={AddCountry}
                pageName="Добавить страны"
                pageDescription="Страны/Добавить страну"
              />
              <Route
                path="/countries/edit/:name&:phone&:id"
                component={EditCountry}
                pageName="Изменить данные страны"
                pageDescription="Страны/Страна"
              />

              <Route
                path="/cities"
                component={Cities}
                pageName="Список городов"
                pageDescription="Города"
              />

              <Route
                path="/cities/add"
                component={AddCity}
                pageName="Добавить город"
                pageDescription="Города/Добавить город"
              />
              <Route
                path="/cities/edit/:name&:countryid&:id"
                component={EditCity}
                pageName="Изменить город"
                pageDescription="Города/Изменить город"
              />
              <Route
                path="/uploadmatrix"
                component={UploadMatrix}
                pageName="Загрузить матрицу"
                pageDescription="Загрузка матрицы"
              />
              <Route
                path="/users"
                component={Users}
                pageName="Пользователи"
                pageDescription="Пользователи"
              />
              <Route
                path="/users/add"
                component={AddUser}
                pageName="Добавить пользователя"
                pageDescription="Пользователи/Добавить пользователя"
              />
              <Route
                path="/users/edit"
                component={EditUser}
                pageName="Добавить пользователя"
                pageDescription="Пользователи/Изменить пользователя"
              />
              <Route
                path="/retailers"
                component={Retailers}
                pageName="Розничные сети"
                pageDescription="Розничные сети"
              />
              <Route
                path="/retailers/add"
                component={AddRetailers}
                pageName="Добавить розничную сеть"
                pageDescription="Розничные сети/Добавить розничную сеть"
              />
              <Route
                path="/retailers/edit/:id&&:name"
                component={EditRetailer}
                pageName="Изменить розничную сеть"
                pageDescription="Розничные сети/Розничная сеть"
              />

              <Route
                path="/shops"
                component={Shops}
                pageName="Магазины"
                pageDescription={"Магазины"}
              />
              <Route
                path="/shops/add"
                component={AddShop}
                pageName="Магазины"
                pageDescription="Магазины/Добавить магазин"
              />

              <Route
                path="/questionswh"
                component={QuestionsWh}
                pageName="Вопросы Whirlpool"
                pageDescription="Вопросы(Whirlpool)"
              />
              <Route
                path="/shops/edit/:shopId&:name&:address&:lat&:lng&:countryId&:cityId&:retailerId"
                component={EditShop}
                pageName="Изменить магазин"
                pageDescription="Магазины/Магазин"
              />
               <Route
                path="/questionswh/create_question"
                component={Question}
                pageName="Создать вопрос"
                pageDescription="Вопросы(whirlpool)/Вопрос"
              />
              <Route
                path="/questionsother"
                component={QuestionsOther}
                pageName="Создать вопрос"
                pageDescription="Вопросы(Другие)/Вопрос"
              />
              <Route
                path="/questionswh/edit"
                component={EditQuestionWh}
                pageName="Изменить вопрос"
                pageDescription="Вопросы(Whirlpool)/Вопрос"
              />
              <Route
                path="/questionsother/edit"
                component={EditQuestionOther}
                pageName="Изменить вопрос"
                pageDescription="Вопросы(Другие)/Вопрос"
              />
              <Route
                path="/questionsother/create_question"
                component={QuestionOther}
                pageName="Создать вопрос"
                pageDescription="Вопросы(Другие)/Вопрос"
              />
              <Route
                path="/downloadmatrix"
                component={DownloadMatrix}
                pageName="downloadmatrix"
                pageDescription="Выгрузка таблицы"
              />
              <Route
                path="/reports"
                component={Reports}
                pageName="reports"
                pageDescription="Отчеты"
              />
              <Route
                path="/question_reports"
                component={QuestionReports}
                pageName="questionReports"
                pageDescription="Отчет по вопросам"
              />
              <Route
                path="/question_reports/question_details/:id"
                component={QuestionDetails}
                pageName="questionReports"
                pageDescription="Отчет по вопросам/Вопрос"
              />
              <Route
                path="/comment_reports"
                component={CommentReports}
                pageName="commentReports"
                pageDescription="Отчет по комментариям"
              />
            
          </Route>

          <Route path="/landing" component={Landing} />
        </Router>
      </Provider>
    );
  }
}
