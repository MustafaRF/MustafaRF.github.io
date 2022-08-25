import React, { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import styled from 'styled-components';

import {
  Window,
  WindowContent,
  WindowHeader,
  Button,
  Toolbar,
  Counter,
  AppBar,
  TextField,
  List,
  ListItem,
  Divider
} from 'react95';

// pick a theme of your choice
import original from 'react95/dist/themes/original';
// original Windows95 font (optionally)
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
  }
`;

const Wrapper = styled.div`
  padding: 5rem;
  background: ${({ theme }) => theme.desktopBackground};
  height: 1000px;
  .window-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .close-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: -1px;
    margin-top: -1px;
    transform: rotateZ(45deg);
    position: relative;
    &:before,
    &:after {
      content: '';
      position: absolute;
      background: ${({ theme }) => theme.materialText};
    }
    &:before {
      height: 100%;
      width: 3px;
      left: 50%;
      transform: translateX(-50%);
    }
    &:after {
      height: 3px;
      width: 100%;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .window {
    width: 400px;
    min-height: 200px;
  }
  .window:nth-child(2) {
    margin: 2rem;
  }
  .footer {
    display: block;
    margin: 0.25rem;
    height: 31px;
    line-height: 31px;
    padding-left: 0.25rem;
  }
`;

const App = () => {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const handleClick = () => setCount(count + 1);

  return <div>
    <GlobalStyles />
    <ThemeProvider theme={original}>
      <Wrapper>
        <Window className='window'>
          <WindowHeader className='window-header'>
            <span>egg95.exe</span>
            <Button onClick={() => alert("Don't try to stop the count!")}>
              <span className='close-icon' />
            </Button>
          </WindowHeader>
          <Toolbar>
            <Button variant='menu' size='sm' disabled>
              File
            </Button>
            <Button variant='menu' size='sm' disabled>
              Edit
            </Button>
            <Button variant='menu' size='sm' disabled>
              Save
            </Button>
          </Toolbar>
          <WindowContent>
            <p>
              This application is meant to help you keep count of how many eggs you have eaten today.<br /><br />
              Note that eating less than 3 eggs a day is detrimental to your health.
            </p>
            <Counter value={count} minLength={3} />
            <Button style={{ display: "block", marginTop: "10px" }} onClick={handleClick}>I ate an egg!</Button>
          </WindowContent>
        </Window>

        <AppBar>
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Button
                onClick={() => setOpen(!open)}
                active={open}
                style={{ fontWeight: 'bold' }}
              >
                Start
              </Button>
              {open && (
                <List
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '100%'
                  }}
                  onClick={() => setOpen(false)}
                >
                  <ListItem>
                    <span role='img' aria-label='👨‍💻'>
                      👨‍💻
                    </span>
                    Profile
                  </ListItem>
                  <ListItem>
                    <span role='img' aria-label='📁'>
                      📁
                    </span>
                    My account
                  </ListItem>
                  <Divider />
                  <ListItem disabled>
                    <span role='img' aria-label='🔙'>
                      🔙
                    </span>
                    Logout
                  </ListItem>
                </List>
              )}
            </div>

            <TextField placeholder='Search...' width={150} />
          </Toolbar>
        </AppBar>
      </Wrapper>
    </ThemeProvider>
  </div >
};

export default App;
