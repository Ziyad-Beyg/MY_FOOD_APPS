import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import "./SignUp.css"
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useHistory } from 'react-router';
import {Link} from "react-router-dom";
import { auth, createUserWithEmailAndPassword, db, doc, setDoc, storage, ref, uploadBytes, getDownloadURL } from "../Configs/firebase"


function SignUp() {
    let [restaurantName, setRestaurantName] = useState('')
    let [email, setEmail] = useState('')
    let [country, setCountry] = useState('')
    let [city, setCity] = useState('')
    let [password, setPassword] = useState('')
    let [selectedImg, setSelectedImg] = useState()
    let [downloadedURL, setDownloadedURL] = useState('')
    let [userAvatarTxt, setUserAvatarTxt] = useState("SELECT AN IMAGE")
    let [userAvatarStyles, setUserAvatarStyles] = useState()
    let [dpError1, setDpError1] = useState({ color: 'red', fontSize: '18px', transition: '1s', wordSpacing: "5px" })
    let [dpError2, setDpError2] = useState({ color: 'red', fontSize: '15px', transition: '1s', wordSpacing: "3px" })
    let [defaultState, setDefaultState] = useState({ color: 'steelblue', fontSize: '15px', transition: '1s', wordSpacing: "1px" })
    let [avatarImgPreview, setAvatarImgPreview] = useState('/broken-image.jpg')

    const History = useHistory()

    useEffect(async () => {
        if (selectedImg) {
            console.log("hello IMAGE")
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setAvatarImgPreview(fileReader.result)
            };
            fileReader.readAsDataURL(selectedImg)

        }
        else {
            setAvatarImgPreview(null)
        }
        
    }, [selectedImg])

    let dpNotFound = () => {

        let condition = true
        let errorBlinker = setInterval(() => {
            if (condition) {
                setUserAvatarStyles(dpError1)
                condition = false

            }
            else if (condition == false) {
                setUserAvatarStyles(dpError2)
                condition = true
            }
        }, 1000)

        setTimeout(() => {
            clearInterval(errorBlinker)
            setUserAvatarStyles(defaultState)
        }, 8000)
    }

    let signUpBtnClicked = async () => {

        if (selectedImg == undefined) {
            console.log("IMAGE NOT FOUND")
            dpNotFound()
        }
        else {
            console.log(selectedImg)
            let { user } = await createUserWithEmailAndPassword(auth, email, password)
            console.log(user.uid)

            let imageRef = ref(storage, `images/restaurantsImg/UID_${Math.random().toString(36).substr(2,11)}`)

            uploadBytes(imageRef, selectedImg).then(async (snapshot) => {
                console.log('Uploaded a blob or file!');
                await getDownloadURL(imageRef)
                    .then(async (url) => {
                         setDownloadedURL(url)

                            let dataRef =  doc(db, "RestaurantsInfo", user.uid)
                        await setDoc(dataRef, {
                            restaurantName, email,country, city, restaurantID: user.uid, userDP:url
                        })
                        History.push("/restaurantHome")

                    })
            });





        }

    }


    return (
        <div className="signup">
            <Paper className="paper" elevation={3}>
                <h1>
                    SIGN UP AS A RESTAURANT
                </h1>
                {/* <br /> */}
                <div className="imageUploadDiv">
                    <label for="signedUpUserDp">
                        <Avatar src={avatarImgPreview} className="uploadDp" />
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
                        id="signedUpUserDp" />
                    <div className='dpTxtWrapp'>
                        <p style={userAvatarStyles} className='avatarText'>
                            {userAvatarTxt}
                        </p>
                    </div>
                </div>
                <br />
                <label className="paper__label">
                    <p className="paper__labelText">Restaurant Name: </p>
                    <input className="paper__input" type="text" value={restaurantName} onChange={(e) => { setRestaurantName(e.target.value) }} />
                </label>
                <label className="paper__label">
                    <p className="paper__labelText">Email: </p>
                    <input className="paper__input" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </label>
                {/* <div className="countryCityDiv"> */}
                <label className="paper__label">
                    <p className="paper__labelText">Country: </p>
                    <input className="paper__input" type="email" value={country} onChange={(e) => { setCountry(e.target.value) }} />
                </label>
                <label className="paper__label">
                    <p className="paper__labelText">City: </p>
                    <input className="paper__input" type="email" value={city} onChange={(e) => { setCity(e.target.value) }} />
                </label>
                {/* </div> */}
                <label className="paper__label">
                    <p className="paper__labelText">Password: </p>
                    <input className="paper__input" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </label>
                
                    <p>
                        Are You A Customer? <Link to="./customerSignUp"> Sign Up As Customer</Link>
                    </p>
                    <p>
                        Already Have An Account? <Link to="./signIn"> Sign In As A Restaurant</Link>
                    </p>
            
                <Button onClick={signUpBtnClicked} className="signup__btn" variant="outlined">SIGN UP</Button>
            </Paper>
        </div>
    )
}

export default SignUp
