import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import styles from '../components/CreatePage.module.css';

function CreatePage() {
  const [formData, setFormData] = useState({
    itemName: '',
    itemContent: '',
    itemPrice: '',
    itemImage: '',
    endTime: '',
    userId:''
  });

  const refendTime = useRef(null);
  const refitemName = useRef(null);
  const refitemContent = useRef(null);
  const refitemPrice = useRef(null);
  const refitemImage = useRef(null);
  const [imagePreview, setImagePreview] = useState('');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageClick = () => {
    refitemImage.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, itemImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlerClick = (e) => {
    e.preventDefault();

    const { itemName, itemContent, itemPrice, itemImage, endTime} = formData;

    if (itemName.trim() === '') {
      alert('경매 물품 이름을 입력하세요.');
      refitemName.current.focus();
      return;
  };

  if (itemContent.trim() === '') {
      alert('경매 물품 내용을 입력하세요.');
      refitemContent.current.focus();
       return;
  };

  if (itemPrice.trim() === '') {
      alert('경매 물품 가격을 입력하세요.');
      refitemPrice.current.focus();
      return;
  };

  if (!itemImage) {
    alert('경매 물품 이미지를 등록하세요.');
    return;
  }

  // if (userPwd1.trim() !== userPwd2.trim()) {
  //     alert('패스워드가 일치하지 않습니다.');
  //     setFormData({ ...formData, userPwd1: '', userPwd2: '' });
  //     refUserPwd1.current.focus();
  //     return;
  // };

  alert(`경매물품: ${itemName}\n경매내용: ${itemContent}\n경매가격: ${itemPrice}\n`);
  const data = new FormData();
  data.append('endTime', endTime);
  data.append('itemName', itemName);
  data.append('itemContent', itemContent);
  data.append('itemPrice', itemPrice);
  data.append('itemImage', itemImage);
  data.append('userId',userId )

  axios.post('http://127.0.0.1:5000/create', data)
    .then(response => {
      alert('경매물품이 등록되었습니다.');
      navigate("/");
    })
    .catch(error => {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    });
  };

  return (
    <>
      <div className={styles.auctionBox}>
        <div style={{ textAlign: 'center' }}>
          <h1>경매 등록</h1>
        </div>
        
        <div className={styles.crinsertBox}>
          <div className={styles.flexdivide}>
          <input className={styles.auinputField} placeholder="경매물품" ref={refitemName} type="text" name="itemName" value={formData.itemName} onChange={handlerChange} /><br />
              <input className={styles.auinputField} placeholder="경매가격" ref={refitemPrice} type="text" name="itemPrice" value={formData.itemPrice} onChange={handlerChange} /><br />
              <input
              className={styles.auinputField}
              type="datetime-local" // Input type for date and time
              name="endTime"
              value={formData.endTime}
              onChange={handleDateChange}
              style={{ width: '100%' }}
            /><br />
            {/* <input
              className={styles.auinputField}
              placeholder="경매물품"
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handlerChange}
            />
            <input
              className={styles.auinputField}
              placeholder="경매가격"
              type="text"
              name="itemPrice"
              value={formData.itemPrice}
              onChange={handlerChange}
            /> */}
            <button className={styles.imagebutton} onClick={handleImageClick}>
              사진 첨부
            </button>
            <input
              type="file"
              accept="image/*"
              name="itemImage"
              ref={refitemImage}
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
          <div className={styles.flexdivide}>
            <textarea
              className={styles.coinputField}
              placeholder="경매내용"
              name="itemContent"
              value={formData.itemContent}
              onChange={handlerChange}
            />
            {imagePreview && (
              <img className={styles.previewImage} src={imagePreview} alt="Selected Image" />
            )}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link to='/'>
            <button className={styles.applyButton} type="submit" onClick={handlerClick}>
              등록
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CreatePage;
