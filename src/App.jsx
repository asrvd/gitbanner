import React, { useState, useRef } from 'react'
import './App.css'
import { get_user } from './api.js';
import html2canvas from 'html2canvas';
const maincanvas = document.createElement('canvas');
import { ComponentToPrint } from './components/card.jsx';
import {
  Menu,
  MenuButton,
  MenuList,
  Input,
  Stack,
  HStack,
  VStack,
  Button,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import {FaAngleDown} from 'react-icons/fa'
import { themes } from '../themes.js';


function App() {
  const [FormData, setFormData] = useState([{
    usern: "username",
    detail: "developer | designer"
  }])
  const [Av, setAv] = useState(["https://i.imgur.com/6KBB1Q3.png"])
  const [Name, setName] = useState(["user"])
  const [Theme, setTheme] = useState(["Theme 1"])
  const [ThemeIndex, setThemeIndex] = useState(0)
  const componentRef = useRef();

  const list = themes.map(item => {
    return (
        // <li id={item.name} onClick={() => handleclick(item.path)}>{item.name}</li>
        <MenuItem id={item.name} onClick={() => handleMenu(item.key, item.name)}>{item.name}</MenuItem>
    )
  })

  const handleChange = async (e) => {
    setFormData({
      ...FormData,
      [e.target.name]: e.target.value
    })
    console.log(FormData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await get_user(FormData.usern)
    console.log(user)
    if (user.message !== "Not Found") {
      setAv(user.avatar_url)
      setName(user.name)
      setUserName(user.login)
    } else {
      alert("User not found!")
    } 
  }

  const handleClick = async() => {
    const component = componentRef.current;
    const canvas = await html2canvas(component, {
      scale: 3,
      allowTaint: true,
      useCORS: true
    });
    maincanvas.width = 883;
    maincanvas.height = 300;
    var ctx = maincanvas.getContext('2d');
    var ratio = canvas.width / canvas.height;
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 883, 883/ratio);
    const data = maincanvas.toDataURL('image/png');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.png';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  }

  const handleMenu = (key, name) => {
    setTheme(name)
    setThemeIndex(key)
  }

  return (
    <React.Fragment>
      <div className='App'>
        <div className='app-preview'>
          <ComponentToPrint theme={ThemeIndex} avatar={Av} name={Name} usern={FormData.usern} details={FormData.detail} ref={componentRef} />
        </div>
        <div className='app-nav-bar'>
          <div className='nav-container'>
            <div className='nav-buttons'>
              <Menu>
                <MenuButton as={Button} rightIcon={<FaAngleDown />} borderRadius='0'>
                  {Theme}
                </MenuButton>
                <MenuList>
                  {list}
                </MenuList>
              </Menu>
            </div>
            <div className='nav-form'>
              <form onSubmit={handleSubmit}>
                <Input name="usern" placeholder='Enter username' onChange={handleChange} marginBottom='5px' marginTop={'5px'} borderRadius='0'/>
                <Input name="detail" placeholder="Enter additional detail" onChange={handleChange} marginTop='0' marginBottom={'5px'} borderRadius='0'/>
                <Button type='submit' onClick={handleSubmit} marginBottom='5px' borderRadius='0'>Generate Banner</Button>
                <Button onClick={handleClick} borderRadius='0'>
                  Download
                </Button>
              </form>
            </div>
          </div>
        </div>
        <p className='footer'>Made with ❤ by <a href="https://github.com/asrvd" target={'blank'}>@asrvd</a></p>
        <p className='footer last'>&copy; ashish | 2021-present</p>
      </div>
    </React.Fragment>
  )
}

export default App
