import React from 'react';
import { connect } from 'react-redux';
import { getCards } from './actions/getcards';
import convert_quarter_string from './js/convert_quarter_string';
import './cssfiles.js'
import LoopHeading from './fields.js'
import FontAwesome from 'react-fontawesome';
import './components/dropdown/styles/global.css';
import PlaceIcon from './css/placeholder.svg';
import PriceIcon from './css/price-tag.svg';
import ReduceIcon from './css/reduce.svg';
import CountingIcon from './css/counting.svg';
import MoneyIcon from './css/MoneyIcon';
import CalendarIcon from './css/CalendarIcon';

import SingleDropdown from './SingleDropdown'
import SingleDropdownMobile from './SingleDropdownMobile'



const App = ({  cards, filterTypes, onFindCard, onGetCards, onToggleMobile, onSelectedDistrict, onSelectedPrice, onToggleList, ownProps }) => {
 let searchInput = '';
 const mobileOpen = false;
  const findCard = () => { onFindCard(searchInput.value) }
  const toggleList = (ev, name) =>{ onToggleList(name) }
  const toggleMobile = (ev, name) =>{ onToggleMobile(name) }
  const selectedDistrict = (id, key, value) => { onSelectedDistrict(id, key, value) }
  const selectedPrice = (id, key, value) => { onSelectedPrice(id, key, value) }

  let image_Style = (a) => {return { backgroundSize: "cover",display: "block",height: "100%", backgroundImage: "url(/uploads/" +  a  + ")" }}
      return (
      <div className="Cards">
        <div className="fields" >
          <div className="row blueb">
              <div className="container">
                <div className="col-lg-12 col-xs-12 flex cardsearch">
                  <input type="text" onChange={findCard} ref={(input) => { searchInput = input}} />
                  <button onClick={findCard}> <img alt="search" src="/brief/magnifying-glass.svg" /> </button>
                </div>
              <div className="dropdown_menu onlydesk">
                <SingleDropdown filterTypes={filterTypes} Icon={PlaceIcon} toggleList={toggleList} selectedOption={selectedDistrict} field={"districts"} />
                <SingleDropdown filterTypes={filterTypes} Icon={PriceIcon} toggleList={toggleList} selectedOption={selectedPrice}    field={"prices"} />
                <SingleDropdown filterTypes={filterTypes} Icon={ReduceIcon} toggleList={toggleList} selectedOption={selectedDistrict} field={"spaces"} />
                <SingleDropdown filterTypes={filterTypes} Icon={CountingIcon} toggleList={toggleList} selectedOption={selectedDistrict} field={"rooms"} />
                <button className="desktop search"><span>Поиск</span><img alt="search" src='/brief/magnifying-glass.svg' /></button>
              </div>
              <div className="dropdown_proto">
                {/* <DropdownProto /> */}
              </div>
            </div>
          </div>
        </div>
        <LoopHeading />
        <div className="container">

          <div className="mobile_filters onlymob"><button className={filterTypes.toggleMobile ? 'toggled btn' : 'untoggled btn'} onClick={(ev) => toggleMobile(ev, filterTypes.mobileOpen)} >Фильтры<FontAwesome name="filter"/></button></div>
          <div className={filterTypes.toggleMobile ? 'dropdown_menu onlymob opened' : 'dropdown_menu onlymob closed'} >
            <button className="close" onClick={(ev) => toggleMobile(ev, filterTypes.mobileOpen)}><FontAwesome name="times"/></button>
          <div className="dropdown_bearer">
            <div className="col-lg-12 col-xs-12 flex cardsearch">
              <input type="text" placeholder="Поиск" onChange={findCard} ref={(input) => { searchInput = input}} />
              <button onClick={findCard}><img alt="search" src="/brief/magnifying-glass.svg" /> </button>
            </div>

            <div className="mobile_filter">  <SingleDropdownMobile filterTypes={filterTypes} Icon={PlaceIcon} toggleList={toggleList} selectedOption={selectedDistrict} field={"districts"} />    </div>
            <div className="mobile_filter">  <SingleDropdownMobile filterTypes={filterTypes} Icon={PriceIcon} toggleList={toggleList} selectedOption={selectedPrice}    field={"prices"} />    </div>
            <div className="mobile_filter">  <SingleDropdownMobile filterTypes={filterTypes} Icon={ReduceIcon} toggleList={toggleList} selectedOption={selectedDistrict} field={"spaces"} />    </div>
            <div className="mobile_filter">  <SingleDropdownMobile filterTypes={filterTypes} Icon={CountingIcon} toggleList={toggleList} selectedOption={selectedDistrict} field={"rooms"} />    </div>

            <button className="search">Поиск</button>


          </div>
          </div>

        <div className="row">
          {
          cards.map((card, index) =>
            <div key={index} className="col-md-3 col-sm-6">
              <div>
              <div className="el_card">
                <div className="image_c">
                  <a href={'/doma/' + card.page_link}   style={image_Style(card.home_background)}>
                  </a>
                </div>
                <div className="panel bordered">
                  <div className="installments_icon" id="installments_icon"><img alt="search" src="/brief/icons8-money-52.png" /></div>
                  <a href="/doma/zhknagagarinskomplato">
                    <h4>{card.title}</h4>
                    <p> {card.address}</p>
                    <span>
                    <span className="svg_price">
                     <MoneyIcon /></span>
                     <span className="bold">от {card.prices_start_at_per_meter}  у.е./м<sup>2</sup></span></span>
                    <span><span className="svg_calendar"><CalendarIcon /> </span>{convert_quarter_string(card.house_deploy_date)}</span>
                    Узнать подробнее <i className="fa fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            </div>
        )}
        </div>
        </div>
        <div style={({ display: 'none' })} >
          <button id="getcard" onClick={onGetCards}>Get cards</button>
        </div>
      </div>
    )
}


const undef_or_NaN = (el) => {
  if (el === 'NaN')   return true
  if (isNaN((el)) && typeof el === 'undefined' ) {
    return true
  } return false
}

const correct_choice = (chosen = [], i) => {
  if (i.selected !== false)
  if (typeof i.value === 'string')
    chosen.push(i.value)
  else
    chosen = i.value
    return chosen
}

const districtsFilter = (state, card) => {
  let chosen;
  chosen = []
  state.lists.filterTypes.districts.options.forEach( i => {
    if (i.selected !== false)
    if (typeof i.value === 'string')
  {    chosen.push(i.value) }
    else
    {  chosen = i.value; }
  })
  return Boolean(chosen.includes(card.block))
}

const priceFilter = (state, card) => {
  let chosen = []
  state.lists.filterTypes.prices.options.map( i => {
  chosen = correct_choice(chosen, i)
  })
  let bool = Number(JSON.parse(card.prices)[1].text) < chosen[1]
  return bool
}

const correctNumber = (incorrectNum) => {
  if (!undef_or_NaN(incorrectNum))
return Number(incorrectNum.replace(',', '.'))
else
return incorrectNum
}

const spaceFilter = (state, card) => {
  let chosen = []
  state.lists.filterTypes.spaces.options.map( i => {
      if (i.selected !== false) {
      chosen.push(i.value)
      }
  })
  let bool = false
  let prices = JSON.parse(card.prices)
  let spaces = [ correctNumber(prices[0].text),
                 correctNumber(prices[2].text),
                 correctNumber(prices[4].text) ]
                 if (chosen.length === 1){

           if (chosen[0][0] < spaces[0] && spaces[0] < chosen[0][1] ) bool = true
           if (chosen[0][0] < spaces[1] && spaces[1] < chosen[0][1] ) bool = true
           if (chosen[0][0] < spaces[2] && spaces[2] < chosen[0][1] ) bool = true
           if (undef_or_NaN(spaces[0]) || undef_or_NaN(spaces[1]) || undef_or_NaN(spaces[2])) bool = true
            if (!bool) {
              console.log(chosen[0][0] ,'<', spaces[0] ,'&&', spaces[0] ,'<', chosen[1]);

            }
         } else {
           chosen.map( e => {
             if (e[0] < spaces[0] && spaces[0] < e[1] ) bool = true
             if (e[0] < spaces[1] && spaces[1] < e[1] ) bool = true
             if (e[0] < spaces[2] && spaces[2] < e[1] ) bool = true
             if (undef_or_NaN(spaces[0]) || undef_or_NaN(spaces[1]) || undef_or_NaN(spaces[2])) bool = true
           })
         }
return bool
}

const roomFilter = (state, card) => {
  let chosen = []
  let availability = {}
    let prices = JSON.parse(card.prices)
  state.lists.filterTypes.rooms.options.map( i => {
    if (i.selected !== false)
    if(i.value.length < 2)
      chosen.push(i.value)
    else
    chosen = i.value
  });
  (isNaN(correctNumber(prices[0].text)) || isNaN(correctNumber(prices[1].text))) ?  availability[0] = false : availability[0] = true;
  (isNaN(correctNumber(prices[2].text)) || isNaN(correctNumber(prices[3].text))) ?  availability[1] = false : availability[1] = true;
  (isNaN(correctNumber(prices[4].text)) || isNaN(correctNumber(prices[5].text))) ?  availability[2] = false : availability[2] = true;
let bool = false
for (let prop in chosen) {
  if (availability[chosen[prop] - 1] === true) bool = true
  }
  if (!bool) {
    console.log(card.title, availability);
  }
return bool
}

export default connect(
  (state, ownProps) => ({
    cards: state.cards
      .filter(
        card => card.note_type === 'Объект' &&
        card.title.toLowerCase().includes(state.filterCards.toLowerCase())
        && districtsFilter(state, card)
        && priceFilter(state, card)
        && spaceFilter(state, card)
        && roomFilter(state, card)
      ),
  filterTypes: state.lists.filterTypes,
  ownProps
  }),
  dispatch => ({
    onFindCard : (task) => {
      dispatch({ type: 'FIND_CARD', payload: task})
    },
    onGetCards: () => {
        dispatch(getCards())
    },
    onToggleList : (payload) => {
      dispatch({ type: 'TOGGLE_LIST', payload: payload})
    },
    onToggleMobile : (name) => {
      dispatch({ type: 'TOGGLE_MOBILE', payload: name})
    },
    onSelectedDistrict : (id, key, value) => {
      dispatch({ type: 'TOGGLE_SELECTED_ITEM', payload: {id:id, key:key}})
      dispatch({ type: 'FILTER_BY_LISTS', payload: {id:id, value:value}})
    },
    onSelectedPrice : (id, key, value) => {
      dispatch({ type: 'TOGGLE_SELECTED_ITEM', payload: {id:id, key:key}})
}
  }),
)(App);
