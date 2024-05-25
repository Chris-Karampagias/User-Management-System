import "./TwitterCardFunctional/twitter-card-style.css";
import { TwitterCardClass } from "./TwitterCardClass/TwitterCardClass";
import { TwitterCardFunctional } from "./TwitterCardFunctional";
import "./App.css";

const url = {
  target: "https://x.com/?lang=en",
};

url.label = url.target.split("https://")[1].split("/")[0];

const twitterCardPropsWithoutAPI = {
  user: "Twitter",
  description: `Happy 3rd anniversary #TBT! See how &quot;Throwback Thursday&quot;
  cemented its status as a weekly Twitter tradition:
  blog.twitter.com/2015/history-o...`,
  title: "History of #TBT on Twitter",
  subtitle: "History of #TBT on Twitter",
  url: url,
  numOfHearts: 695,
  numOfComments: 482,
  dateCreated: "6:26 PM - Apr 30, 2015",
  commentUrl: "https://x.com/?lang=en",
};

const twitterCardPropsWithAPI = {
  userId: 1,
  description: `Happy 3rd anniversary #TBT! See how &quot;Throwback Thursday&quot;
  cemented its status as a weekly Twitter tradition:
  blog.twitter.com/2015/history-o...`,
  title: "History of #TBT on Twitter",
  subtitle: "History of #TBT on Twitter",
  url: url,
  numOfHearts: 695,
  numOfComments: 482,
  dateCreated: "6:26 PM - Apr 30, 2015",
  commentUrl: "https://x.com/?lang=en",
};

function App() {
  return (
    <>
      {/* <TwitterCardFunctional {...twitterCardPropsWithoutAPI} /> */}
      {/* <TwitterCardClass {...twitterCardPropsWithoutAPI} /> */}
      {/* <TwitterCardFunctional {...twitterCardPropsWithAPI} /> */}
      <TwitterCardClass {...twitterCardPropsWithAPI} />
    </>
  );
}

export default App;
