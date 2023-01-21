import React from "react";
import { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
  


function App ( ) { //TestIt
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isEmailPicked, setIsEmailPicked] = useState(false);

  const [imgPaint, setImgPaint] = useState(null);
  const [isImgPaint, setIsImgPaint] = useState(false);

  const [imgPencil, setImgPencil] = useState(null);
  const [isImgPencil, setIsImgPencil] = useState(false);

  const [click, setClick] = useState(null);
  const [isClick, setIsClick] = useState(false);

  const changeHandler = (event) => {
      setSelectedFile(event.target.files[0]);
      setIsFilePicked(true);
  };

  const changeHandlerEmail = (event) => {
    setSelectedEmail(event.target.value);
    setIsEmailPicked(true);
  };

  const changeHandleClick = (event) =>{
    setIsClick(true);
    document.getElementById('form-enter').reset();
  };

  const handleSubmit = event => {
    event.preventDefault();
    const formData2 = new FormData();
    formData2.append(
      "file",
      selectedFile,
      selectedFile.name
    );
    formData2.append(
      'email',
      selectedEmail
    );
  const requestOptions = {
      method: 'POST',
      headers: { },  
      //mode: 'no-cors',
      body: formData2
  };

  const respJson = fetch('http://127.0.0.1:8000/upload', requestOptions)
  .then(response => response.json())
  .then(img => (setImgPaint(img.image_paint.first), setImgPencil(img.image_pencil.first)))
  .then(() => (setIsImgPaint(true), setIsImgPencil(true), setIsClick(false)));//.then(resp => resp.json()).then(r => r.image_paint.first);  

};

  return (  
  <div>
    <br/>
      <form onSubmit={handleSubmit} id='form-enter'>
        <fieldset>
          <label>Email:</label>
          <input name="email" type="email" onChange={changeHandlerEmail} />
        </fieldset>
        <br/>
        <fieldset>
          <input name="image" type="file" onChange={changeHandler} accept=".jpeg, .png, .jpg"/>
          {isFilePicked ? <img src={URL.createObjectURL(selectedFile)} height='64' width='64'/> : <img src='https://mag-efir.com/upload/iblock/af7/af70208cea7627be119710fe335cd6f3.jpg' height='64' width='64' />}
        </fieldset>
        <Button type="submit" onClick={changeHandleClick}>Отправить</Button>
      </form>
      <br/>
      <div>
        <div>
          { isClick? <img src='https://i1.wp.com/apollo.iimsol.eu/students/images/loading_1.gif' width='512'/>:<img src='https://i.yapx.ru/Grj9n.gif' width='256'/>}
        </div>
        <br/>
        <div>
          {isImgPaint ? <img src={`data:image/png;base64,${imgPaint}`} />: ''}
          {isImgPencil ? <img src={`data:image/png;base64,${imgPencil}`} />: ''}
        </div>
      </div>
  </div>
);
// <img src={URL.createObjectURL(selectedFile)} height='64' width='64'/>
//{this.resp.image ? <img src={`data:image/png;base64,${this.state.image_paint.first}`}/>: ''}
//{this.resp.image_pencil ? <img src={`data:image/png;base64,${this.state.image_pencil.first}`}/>: ''}
}
export default App;