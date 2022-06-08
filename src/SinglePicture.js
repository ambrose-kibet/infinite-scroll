import React from "react";

const SinglePicture = ({ pic }) => {
  const {
    likes,
    urls: { small },
    user: { name, profile_image },
    description,
  } = pic;
  return (
    <article className="img-card">
      <img src={small} alt={description} className="main-img" />
      <div className="info-container">
        <div className="personal">
          <h5>{name}</h5>
          <p>{likes} Likes</p>
        </div>
        <div className="profile-img">
          <img src={profile_image.small} alt="user" className="small-img" />
        </div>
      </div>
    </article>
  );
};

export default SinglePicture;
