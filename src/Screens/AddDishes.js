import React, {useState, useEffect, useContext} from 'react'
import "./addDishes.css"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { GlobalContext } from '../Context/ContextAPI';
import { db, collection, addDoc, storage, ref, uploadBytes, getDownloadURL } from "../Configs/firebase"
import { useHistory } from 'react-router';
import RestaurantNav from '../Components/RestaurantNav'



function AddDishes() {

  // const [avatarImg, setAvatarImg] = useState('https://www.freepnglogos.com/uploads/plus-icon/add-plus-icon-28.png')
  const [avatarImg, setAvatarImg] = useState('https://www.pinclipart.com/picdir/big/402-4028757_food-tray-coloring-page-food-tray-clipart-black.png')
  // const [avatarImg, setAvatarImg] = useState('https://archive.org/download/clickme_202004/tapme.gif')
  const [selectedImg, setSelectedImg] = useState()
  const [itemName, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState('')
  const [category, setCategory] = useState(null)
  const [delivery, setDelivery] = useState(null)
  const [textFeildsError, setTextFeildsError] = useState('')
  const [downloadedURL, setDownloadedURL] = useState()
  const {state, dispatch} = useContext(GlobalContext)
  const History = useHistory()

useEffect(() => {
  if(state.currentUser === null){
    History.push('/restaurantHome')
  }
  console.log(state.currentUser)
}, [])

  useEffect(async () => {
    if (selectedImg) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setAvatarImg(fileReader.result)
      };
      fileReader.readAsDataURL(selectedImg)
    }
    else {
      setAvatarImg('https://www.pinclipart.com/picdir/big/402-4028757_food-tray-coloring-page-food-tray-clipart-black.png')
    }
    
  }, [selectedImg])
  
  useEffect(() => {
    console.log(category)
  }, [category])
  
  useEffect(() => {
    console.log(delivery)
  }, [delivery])
  


  const foodCategory = [
    { title: 'Pakistani' },
    { title: 'Chinese' },
    { title: 'Italian' },
  ];

  const defaultProps1 = {
    options: foodCategory,
    getOptionLabel: (option) => option.title,
  };

  const DeliveryType = [
    { type: 'Free' },
    { type: 'Paid' },
  ];

  const defaultProps2 = {
    options: DeliveryType,
    getOptionLabel: (option) => option.type,
  };

  const createNewDish = async () => {
    // let newDish = {
    //   itemName,
    //   itemPrice: itemPrice + " Rupees" ,
    //   itemCategory: category.title,
    //   itemDeliveryType: delivery.type
    // }
    // console.log(newDish)

  if (selectedImg == undefined) {
      let error = setTimeout(() => {
        setTextFeildsError('Select An Image !!!')
      }, 1)
      setTimeout(()=>{
        setTextFeildsError('')
      }, 3000)
    }
  else if(itemName == '' || itemPrice == '' || category == null || delivery == null){
    let error = setTimeout(() => {
      setTextFeildsError('Text Fields Can Not Be Empty !!!')
    }, 1)
    setTimeout(()=>{
      setTextFeildsError('')
    }, 3000)
  }
  else {
    
      console.log(selectedImg)
          
      let imageRef = ref(storage, `images/FoodImg/UID_${Math.random().toString(36).substr(2,11)}`)

      uploadBytes(imageRef, selectedImg).then(async (snapshot) => {
          console.log('Uploaded a blob or file!');
          await getDownloadURL(imageRef)
              .then(async (url) => {
                   setDownloadedURL(url)
                  //  const docRef = await addDoc(collection(db, "FOOD_DISHES"), {
                  //   name: "Tokyo",
                  //   country: "Japan"
                  // });
                   
                      let dataRef =  collection(db, "FOOD_DISHES")
                  await addDoc(dataRef, {
                      itemImg : url,
                      itemName,
                      itemPrice: itemPrice ,
                      itemCategory: category.title,
                      itemDeliveryType: delivery.type,
                      restaurantID : state.currentUser.restaurantID,
                      restaurantName : state.currentUser.restaurantName,
                  })

                  History.push("/restaurantHome")

              })
      });
      
      
      





  }

  }

    return (
        <div>

      <RestaurantNav restaurantName={state.currentUser?.restaurantName} city={state.currentUser?.city} />


          <div className='mainContainerDiv'>
            <h1 className="heading1">
                ADD YOUR NEW DISHES
            </h1>
            <div className='paperDiv'>
            <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
        //   width: '60%',
          height: 128,
        //   border:'1px solid red',
        },
      }}
    >
      <Paper className='paper' elevation={6}>
        <div>
            <label for="foodPicSelector">
                <Avatar className="foodPicHolder" src={avatarImg} />
            </label>
            <input style={{ display: 'none', visibility: 'none' }} type="file" accept='image/*'
                        onChange={(e) => {
                            let file = e.target.files[0];
                            if (file && file.type.substr(0, 5) === "image") {
                                console.log('image found')
                                setSelectedImg(file)
                            }
                            else {
                                setSelectedImg(null)
                            }
                        }} required
                        id="foodPicSelector" />
            <p className="foodImageText">
              Insert Item Image <ArrowUpwardRoundedIcon style={{marginLeft: '20px'}} />
            </p>
        </div>

        <div>
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField className="inputForFood" id="standard-basic" value={itemName} onChange={(e)=>{setItemName(e.target.value)}} label="Item Name" variant="standard" />
      <TextField className="inputForFood" id="standard-basic" value={itemPrice} onChange={(e)=>{setItemPrice(e.target.value)}} label="Price" variant="standard" />
      <Autocomplete className="dropDownContainer" {...defaultProps1} id="controlled-demo" value={category} onChange={(event, newValue) => { setCategory(newValue); }} renderInput={(params) => ( <TextField {...params} label="Category" variant="standard" /> )} />
      <Autocomplete className="dropDownContainer" {...defaultProps2} id="controlled-demo" value={delivery} onChange={(event, newValue) => { setDelivery(newValue); }} renderInput={(params) => ( <TextField {...params} label='Delivery' variant="standard" /> )} />
      <div className="inputErrors">
      <h4>
        {textFeildsError}
      </h4>
      </div>
      <Button onClick={createNewDish} variant="outlined">CREATE DISH</Button>
    </Box>
        </div>
      </Paper>
    </Box>
            </div>
        </div>
        </div>
    )
}

export default AddDishes
