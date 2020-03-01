import axios from 'axios';

//action types

const GET_CHARITY = 'GET_CHARITY'; //get users through table with charity
const SET_CHARITY = 'SET_CHARITY';
const REMOVE_CHARITY = 'REMOVE_CHARITY';

//initial state
const initialState = {
  user: {},
  totalDonated: 0,
}
