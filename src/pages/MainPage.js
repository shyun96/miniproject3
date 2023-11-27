// MainPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../components/MainPage.module.css";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";
function MainPage() {
  const location = useLocation();
  const query = location.state?.query.trim() || '';

  
  //키워드 검색시, query에 해당 키워드 할당됨.
  // const query = new URLSearchParams(location.search).get("query");

  //정렬옵션 상태
  const [sortMethod, setSortMethod] = useState("date");

  //게시글데이터 상태
  const [itemDataList, setItemDataList] = useState([]);

  useEffect(() => {
      const queryString = `sort=${sortMethod}&keyword=${query}`;
      axios
        .get(`http://127.0.0.1:5000?${queryString}`) //Mock데이터로 테스트
        .then((itemData) => {
          console.log(itemData.data)
          setItemDataList(itemData.data);
          window.scrollTo(0, 0);
        })
      .catch((error) => {
        console.error(error);
      });
    //} 
  }, [sortMethod, query]);

  // 게시글 정렬 이벤트
  const handleSortChange = (e) => {
    console.log(`${e.target.value}순으로 정렬합니다.`);
    setSortMethod(e.target.value);
  };

  return (
    <div className={styles.mainContainer}>
      {/* 누르면 옵션 나오는 버튼 */}
      <div className={styles.dropDownContainer}>
        <select
          className={styles.dropDown}
          id="sort"
          onChange={handleSortChange}
        >
          <option value="date">최신순</option>
          <option value="priceDown">높은 가격순</option>
          <option value="priceUp">낮은 가격순</option>
        </select>
      </div>
      <div className={styles.cardContainer}>
        {/* api완성 시, dummyData => itemDataList로 변경 */}
        {itemDataList.map((cardInfo) => (
          <Card key={cardInfo.id} cardInfo={cardInfo} />
        ))}
      </div>
    </div>
  );
}

export default MainPage;