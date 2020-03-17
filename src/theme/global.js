import {createGlobalStyle} from 'styled-components';

import TradeGothic2 from 'Fonts/TradeGothicCn18.woff2';
import TradeGothic from 'Fonts/TradeGothicCn18.woff';
import TradeGothicBOLD2 from 'Fonts/TradeGothicBoldCn20.woff2';
import TradeGothicBOLD from 'Fonts/TradeGothicBoldCn20.woff';


export default createGlobalStyle`
    @font-face {
        font-family: "TradeGothic";
        src: url(${TradeGothic2}) format("woff2"),
             url(${TradeGothic}) format("woff");
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: "TradeGothicBold";
        src: url(${TradeGothicBOLD2}) format("woff2"),
             url(${TradeGothicBOLD}) format("woff");
        font-weight: normal;
        font-style: normal;
    }
`;