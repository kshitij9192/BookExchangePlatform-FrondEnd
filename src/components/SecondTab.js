import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ListMyBooks from './ListMyBooks';
import ListMyRequests from './ListMyRequests';
import ListSentRequests from './ListSentRequests';


export default function SecondTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="My Books" />
        <Tab label="My Received Requests" />
        <Tab label="My Sent Requests" />
      </Tabs>
      {value ==0 && <ListMyBooks/>}
      {value ==1 && <ListMyRequests/>}
      {value ==2 && <ListSentRequests/>}
      
    </Box>
  );
}
