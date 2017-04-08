import React from 'react'

//  MUI Theme Initialization (rather opinionated)
//  http://www.material-ui.com/#/customization/themes
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Theme from '../theme'
const muiTheme = getMuiTheme(Theme)

//  Tap Event Plugin Injection  (required, will remove in @next distro of material-ui)
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'

//  Containers
import Chat from './Chat'
//  Components
import Nav from './Nav'

class App extends React.Component {
  constructor (props) {
    super(props)
    let mobile = window.innerWidth <= 1024
    this.state = {
      mobile,
      nav: !mobile,
      stream: []
    }
    this.handleResize = this.handleResize.bind(this)
    this.toggleNav = () => this.setState({ nav: !this.state.nav })
  }
  componentWillMount () {
    window.addEventListener('resize', this.handleResize)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }
  //  UI Methods (responsive drawer)
  handleResize () {
    let mobile = window.innerWidth <= 1024
    this.setState({ mobile, nav: !mobile })
  }

  render () {
    //  Push body content if nav is docked & open on desktops
    const push = this.state.nav && !this.state.mobile ? Theme.drawer.width : 0
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Drawer
            open={this.state.nav}
            docked={!this.state.mobile}
            onRequestChange={this.toggleNav}
            containerStyle={Theme.drawer}
            zDepth={1}
          >
            <Nav handleCall={this.handleCall} />
          </Drawer>
          <div id='body' style={{paddingLeft: push}}>
            <AppBar
              title='ZipCode API'
              onLeftIconButtonTouchTap={this.toggleNav}
              zDepth={2}
              />
            <Chat />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App