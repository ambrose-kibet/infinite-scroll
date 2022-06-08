import axios from "axios";
import React, { useState, useEffect } from "react";
import SearchComponent from "./SearchComponent";
import SinglePicture from "./SinglePicture";
const url = "https://api.unsplash.com/photos/?client_id=";
const searchurl = "https://api.unsplash.com/search/photos/?client_id=";

function App() {
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");
  const [pictures, setpictures] = useState([]);
  const [pageNo, setpageNo] = useState(1);

  const fetchItems = async () => {
    if (!searchTerm) {
      setisLoading(true);

      await axios(`${url}${process.env.REACT_APP_ACCESS_KEY}&page=${pageNo}`)
        .then((res) => {
          setpictures([...pictures, ...res.data]);
        })
        .catch((err) => {
          setisError(true);
          setisLoading(false);
          console.log(err.response.data);
        });

      setisLoading(false);
    } else {
      setisLoading(true);

      await axios(
        `${searchurl}${process.env.REACT_APP_ACCESS_KEY}&page=${pageNo}&query=${searchTerm}`
      )
        .then((res) => {
          if (pageNo === 1) {
            setpictures([...res.data.results]);
          } else {
            setpictures([...pictures, ...res.data.results]);
          }
        })
        .catch((err) => {
          setisError(true);
          setisLoading(false);
          console.log(err.response.data);
        });

      setisLoading(false);
    }
  };
  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, [pageNo]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    setpictures((olpics) => {
      return [];
    });
    setpageNo(1);
    fetchItems();
  };
  useEffect(() => {
    const move = window.addEventListener("scroll", () => {
      if (
        !isLoading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 100
      ) {
        setpageNo((oldNo) => {
          return oldNo + 1;
        });
      }
    });

    return () => {
      window.removeEventListener("scroll", move);
    };
    // eslint-disable-next-line
  }, []);

  if (isError) {
    return (
      <main>
        <h3 style={{ textAlign: "center" }}> Oops! something went wrong</h3>
      </main>
    );
  }

  return (
    <main className="pic-center">
      <SearchComponent
        searchTerm={searchTerm}
        setsearchTerm={setsearchTerm}
        handleSubmit={handleSubmit}
      />
      {pictures.length > 0 &&
        pictures.map((pic, index) => {
          return <SinglePicture key={index} item={pic} pic={pic} />;
        })}
      {isLoading ? (
        <main className="pic-center">
          <h3 style={{ textAlign: "center" }}>Loading...</h3>
        </main>
      ) : null}
    </main>
  );
}
export default App;
