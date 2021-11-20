import React,{useState, useEffect, useContext} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {GlobalContext} from "../Context/ContextAPI"

function DropDown({dropdownValue1, dropdownValue2, dropdownPlaceholder}) {

  const foodCategory = [
    { title: dropdownValue1 },
    { title: dropdownValue2 },
  ];

  const defaultProps = {
    options: foodCategory,
    getOptionLabel: (option) => option.title,
  };

  const [ddValue, setDDValue] = useState(null);

  // const {state, dispatch} = useContext(GlobalContext)

  useEffect(() => {
    console.log(ddValue)
  }, [ddValue])

    

    return (
        <div style={{width:'100%'}}>
          <Autocomplete
        {...defaultProps}
        id="controlled-demo"
        value={ddValue}
        onChange={(event, newValue) => {
          setDDValue(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label={dropdownPlaceholder} variant="standard" />
        )}
      />
        </div>
    )
}

export default DropDown


// import React, {useState} from 'react';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';


// export default function DropDown({dropdownValue1, dropdownValue2, dropdownPlaceholder}) {
  
//   const options = [dropdownValue1, dropdownValue2];

//   const [value, setValue] = useState(options[0]);
//   const [inputValue, setInputValue] = useState('');
  
//   return (
//     <div>
//       <br />
//       {/* <Autocomplete
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//         inputValue={inputValue}
//         onInputChange={(event, newInputValue) => {
//           setInputValue(newInputValue);
//         }}
//         id="controllable-states-demo"
//         options={options}
//         sx={{ width: 300 }}
//         renderInput={(params) => <TextField {...params} label={dropdownPlaceholder} />}
//       /> */}
//       <Autocomplete
//         {...defaultProps}
//         id="controlled-demo"
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//         renderInput={(params) => (
//           <TextField {...params} label="controlled" variant="standard" />
//         )}
//       />
//     </div>
//   );
// }