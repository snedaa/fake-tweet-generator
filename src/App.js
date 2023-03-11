import "./style.scss";
import {
  ReplyIcon,
  RetweetIcon,
  LikeIcon,
  ShareIcon,
  VerifiedIcon,
} from "./components/icon";
import { useEffect, useState } from "react";
import { AvatarLoader } from "./components/loaders";
import { language } from "./components/language";

const tweetFormat = (tweet) => {
  tweet = tweet
    .replace(/@([\w]+)/g, "<span>@$1</span>")
    .replace(/#([\wşçöğüıİ]+)/gi, "<span>#$1</span>")
    .replace(/(https?:\/\/[\w\.\/]+)/, "<span>$1</span>");
  return tweet;
};

const formatNumber = (number) => {
  if (!number) {
    number = 0;
  }
  if (number < 1000) {
    return number;
  }
  /// 1500

  number/= 1000
  number = number.toString().split('.')
  return number[0] + ',' + number[1][0]
};

function App() {
  const [lang, setLang] = useState("tr");
  const [langText, setLangText] = useState(language[lang]);
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [isVerified, setVerified] = useState(0);
  const [tweet, setTweet] = useState();
  const [avatar, setAvatar] = useState();
  const [retweets, setRetweets] = useState(0);
  const [quoteTweets, setQuoteTweets] = useState(0);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    setLangText(language[lang]);
  }, [lang]);

  const avatarHandle = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      setAvatar(this.result);
    });
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="tweet-settings">
        <h3>{langText?.settings}</h3>
        <ul>
          <li>
            <label>{langText?.name}</label>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label>{langText?.username}</label>
            <input
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </li>
          <li>
            <label>Avatar</label>
            <input type="file" className="input" onChange={avatarHandle} />
          </li>
          <li>
            <label>Tweet</label>
            <textarea
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              className="textarea"
              maxLength="290"
            />
          </li>
          <li>
            <label>Retweet</label>
            <input
              type="number"
              className="input"
              value={retweets}
              onChange={(e) => setRetweets(e.target.value)}
            />
          </li>
          <li>
            <label>{langText?.retweet}</label>
            <input
              type="number"
              className="input"
              value={quoteTweets}
              onChange={(e) => setQuoteTweets(e.target.value)}
            />
          </li>
          <li>
            <label>{langText?.likes}</label>
            <input
              type="number"
              className="input"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
            />
          </li>
          <li>
            <label>{langText?.verified}</label>
            <select
              onChange={(e) => setVerified(e.target.value)}
              value={isVerified}
            >
              <option value="1">{langText?.yes}</option>
              <option value="0">{langText?.no}</option>
            </select>
          </li>
          <button>Oluştur</button>
        </ul>
      </div>

      <div className="tweet-container">
        <div className="app-language">
          <span
            onClick={() => setLang("tr")}
            className={lang === "tr" && "active"}
          >
            Türkçe
          </span>
          <span
            onClick={() => setLang("en")}
            className={lang === "en" && "active"}
          >
            English
          </span>
        </div>
        <div className="fetch-info">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button>Bilgileri çek</button>
        </div>
        <div className="tweet">
          <div className="tweet-author">
            {(avatar && <img src={avatar} />) || <AvatarLoader />}
            <div>
              <div className="name">
                {name || "Ad Soyad"}
                {isVerified ==1 && <VerifiedIcon width="19" height="19" />}
              </div>
              <div className="username">@{username || "kullaniciadi"}</div>
            </div>
          </div>
          <div className="tweet-content">
            <p
              dangerouslySetInnerHTML={{
                __html:
                  (tweet && tweetFormat(tweet)) || "Bu alana tweet gelecek.",
              }}
            ></p>
          </div>
          <div className="tweet-stats">
            <span>
              <b>{formatNumber(retweets)}</b> Retweet
            </span>
            <span>
              <b>{formatNumber(quoteTweets)}</b> {langText?.retweet}
            </span>
            <span>
              <b>{formatNumber(likes)}</b> {langText?.likes}
            </span>
          </div>{" "}
          {
            <div className="tweet-actions">
              <span>
                <ReplyIcon />
              </span>
              <span>
                <RetweetIcon />
              </span>
              <span>
                <LikeIcon />
              </span>
              <span>
                <ShareIcon />
              </span>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default App;
