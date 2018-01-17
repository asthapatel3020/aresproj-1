/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree. 
 * 
 * @providesModule Menu
 */

import React, { Component } from "react";
import { Link } from "react-router";

import MenuItem from "../components/widgets/MenuItem";
var shallowCompare = require("react-addons-shallow-compare");

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  toggleShowHide() {
    this.setState({ open: !this.state.open });
  }

  render() {
    var classes = "bg-white aside-md hidden-print";
    var navClasses = "nav-primary";
    // var navClasses='';
    if (!this.state.open) {
      // classes += " nav-xs";
      navClasses += " hidden-xs";
    }

    const { apps, schema, blocks, selectedAppIndex } = this.props;

    return (
      <aside className={classes} id="nav">
        <section className="vbox">
          <header className="header bg-warn brand-header lock-header pos-stat clearfix">
            <a
              className="btn btn-link visible-xs"
              onClick={() => this.toggleShowHide()}
              data-toggle="class:nav-off-screen,open"
              data-target="#nav,html"
            >
              <i className="fa fa-bars" />
            </a>
            {
              //w-f scrollable 
            }
          </header>
          <section className="menu-section">
            <div className="slimScrollDiv">
              <div
                className="slim-scroll"
                data-height="auto"
                data-disable-fade-out="true"
                data-distance="0"
                data-size="5px"
                data-color="#333333"
              >
                <nav className={navClasses}>
                  <ul className="menu-nav">
                    <MenuItem
                      link={"/"}
                      icon="fa-home"
                      color="bg-danger"
                      linkText="Отчеты"
                      currentPage={this.props.currentPage}
                    />
                     <MenuItem
                      link={"/"}
                      icon="fa-home"
                      color="bg-danger"
                      linkText="Отчет по вопросам"
                      currentPage={this.props.currentPage}
                    />

                    <MenuItem
                      link={"/"}
                      icon="fa-home"
                      color="bg-danger"
                      linkText="Отчет по комментариям"
                      currentPage={this.props.currentPage}
                    />
                    <MenuItem
                      link={"/"}
                      icon="fa-home"
                      color="bg-danger"
                      linkText="Аудиты"
                      currentPage={this.props.currentPage}
                    />
                    <MenuItem
                      link={"/uploadMatrix"}
                      icon="fa-home"
                      color="bg-danger"
                      linkText="Загрузка матрицы"
                      currentPage={this.props.currentPage}
                    />
                    <MenuItem
                      link={"/"}
                      icon="fa-home"
                      color="bg-danger"
                      linkText="Выгрузка таблицы"
                      currentPage={this.props.currentPage}
                    />
                    <MenuItem
                      link={"/users"}
                      icon="fa-home"
                      color="bg-danger"
                      linkText="Пользователи"
                      currentPage={this.props.currentPage}
                    />
                    <div className="menu-title">Настройка магазинов</div>

                    <MenuItem
                      link={"/countries"}
                      icon="fa-home"
                      color="bg-danger"
                      linkText="Страны"
                      currentPage={this.props.currentPage}
                    />
                    <MenuItem
                      link={"/cities"}
                      icon="fa-home"
                      color="bg-danger"
                      linkText="Города"
                      currentPage={this.props.currentPage}
                    />
                    <MenuItem
                      link={"/retailers"}
                      icon="fa-home"
                      color="bg-danger"
                      linkText="Розничные сети"
                      currentPage={this.props.currentPage}
                    />
                    <MenuItem
                      link={"/"}
                      icon="fa-home"
                      color="bg-danger"
                      linkText="Магазины"
                      currentPage={this.props.currentPage}
                    />
                    <div className="menu-title">Настройка анкет</div>
                    <MenuItem
                      link={"/"}
                      icon="fa-home"
                      color="bg-danger"
                      linkText="Вопросы(Whirlpool)"
                      currentPage={this.props.currentPage}
                    />
                    <MenuItem
                      link={"/"}
                      icon="fa-home"
                      color="bg-danger"
                      linkText="Вопросы(другие)"
                      currentPage={this.props.currentPage}
                    />
                  </ul>
                </nav>
              </div>
              <div className="slimScrollBar scrollBar" />
              <div className="slimScrollRail scrollRail" />
            </div>
          </section>
        </section>
      </aside>
    );
  }
}

class SubMenuItem extends Component {
  render() {
    var badge = this.props.badgeText
      ? <b className="badge bg-danger pull-right">{this.props.badgeText}</b>
      : null;
    return (
      <li>
        {" "}<Link to={this.props.link}>
          {" "}<i className="fa fa-angle-right" /> {badge}<span>{this.props.linkText}</span>
          {" "}
        </Link>
        {" "}
      </li>
    );
  }
}
