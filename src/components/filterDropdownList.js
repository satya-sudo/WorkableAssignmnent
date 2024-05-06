import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Chip } from '@mui/material';


const FilterDropdownList = ({label, options, value, setValue, multiple }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <Autocomplete
        multiple={multiple}
        value={value}
        filterSelectedOptions
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip size='small' label={option} {...getTagProps({ index })} />
            ))
          }  
        id="controllable-states-demo"
        options={options}
        sx={{ minWidth: 200, margin: '0px 5px 10px 0px' }}
        size='small'
        renderInput={(params) => <TextField {...params} label={label} placeHolder={label} />}
      />
    </div>
  );
}

export default FilterDropdownList;