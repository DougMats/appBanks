import Axios from 'axios';
import { bankEndPoints } from '../constants/endPoints';

export function getListBanksProvider(){
    return Axios.get(`${bankEndPoints.getList}`);
}