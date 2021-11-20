import React from 'react';
import Box from '@mui/material/Box';

export default function BoxSx({Img, boxValue}) {
  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <Box
      sx={{
        width: 250,
        height: 250,
        backgroundColor: '#202020',
        color:'#fff',
        fontSize:24,
        borderRadius: 20,
        transform:'rotate(45deg)',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'sans-serif',
        letterSpacing:'4px',
        wordSpacing:'6px',
        '&:hover': {
          cursor:'pointer',
        },
      }}
    >
      <Img style={{fontSize:"8rem",
  transform:'rotate(-45deg)',
    }}/>
    </Box>
    <h1 style={{color:'#202020' }}>
      {boxValue}
    </h1>
    </div>
  );
}