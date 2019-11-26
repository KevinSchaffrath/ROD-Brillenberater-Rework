import React, {PureComponent} from 'react';
import styled from 'styled-components';

/**
 * App Component.
 *
 * @export
 * @class App
 * @extends {PureComponent}
 */
export default class App extends PureComponent {
    /**
     * Renders the App.
     *
     * @returns {JSX} React Component.
     * @memberof App
     */
    render() {
        return (
            <>
                <AppContainer>
                    <SmallText>
                        Wenn dein Name nicht der richtige ist und dein Projekt
                        auch nicht dann schau bitte in die README.MD!
                    </SmallText>
                </AppContainer>
            </>
        );
    }
}

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    background: #202229;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const SmallText = styled.span`
    color: #ff6700;
    text-align: center;
    font-family: Arial;
`;