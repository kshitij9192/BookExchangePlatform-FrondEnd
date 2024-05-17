import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppAppBar from './AppAppBar';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import UserHome from './UserHome';
import SecondTab from './SecondTab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
    <AppAppBar/>
    <Box
      sx={{ flexGrow: 1,    flexBasis: 0,  height: 140 }}
    >

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Exchange Requests" {...a11yProps(0)} />
        <Tab label="My Books and Requests" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <UserHome/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <SecondTab/>
      </TabPanel>
    </Box>
    </div>
  );
}


// export default function ButtonAppBar() {
//   return (
//     <div> 
//       <AppAppBar/>
//     </div>
    

//   );
// }


