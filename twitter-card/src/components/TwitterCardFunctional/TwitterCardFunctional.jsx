import { useUser } from "../../hooks/useUser/useUser";

export function TwitterCardFunctional({
  userId,
  description,
  title,
  subtitle,
  url,
  numOfHearts,
  numOfComments,
  dateCreated,
  commentUrl,
}) {
  const user = useUser(userId)

  return (
    <div className="card">
      <div className="user-info-container">
        <div className="username">
          <svg
            height="100%"
            style={{
              fillRule: "evenodd",
              clipRule: "evenodd",
              strokeLinejoin: "round",
              strokeMiterlimit: 2,
            }}
            version="1.1"
            viewBox="0 0 512 512"
            width="100%"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g>
              <path
                d="M448,512l-384,0c-35.328,0 -64,-28.672 -64,-64l0,-384c0,-35.328 28.672,-64 64,-64l384,0c35.328,0 64,28.672 64,64l0,384c0,35.328 -28.672,64 -64,64Z"
                id="Dark_Blue"
                style={{ fill: "#1da1f2", fillRule: "nonzero" }}
              />
              <path
                d="M196.608,386.048c120.704,0 186.752,-100.096 186.752,-186.752c0,-2.816 0,-5.632 -0.128,-8.448c12.8,-9.216 23.936,-20.864 32.768,-34.048c-11.776,5.248 -24.448,8.704 -37.76,10.368c13.568,-8.064 23.936,-20.992 28.928,-36.352c-12.672,7.552 -26.752,12.928 -41.728,15.872c-12.032,-12.8 -29.056,-20.736 -47.872,-20.736c-36.224,0 -65.664,29.44 -65.664,65.664c0,5.12 0.64,10.112 1.664,14.976c-54.528,-2.688 -102.912,-28.928 -135.296,-68.608c-5.632,9.728 -8.832,20.992 -8.832,33.024c0,22.784 11.648,42.88 29.184,54.656c-10.752,-0.384 -20.864,-3.328 -29.696,-8.192l0,0.896c0,31.744 22.656,58.368 52.608,64.384c-5.504,1.536 -11.264,2.304 -17.28,2.304c-4.224,0 -8.32,-0.384 -12.288,-1.152c8.32,26.112 32.64,45.056 61.312,45.568c-22.528,17.664 -50.816,28.16 -81.536,28.16c-5.248,0 -10.496,-0.256 -15.616,-0.896c28.928,18.432 63.488,29.312 100.48,29.312"
                id="Logo__x2014__FIXED"
                style={{ fill: "#fff", fillRule: "nonzero" }}
              />
            </g>
          </svg>
          <div className="username-info">
            <div>
              <h1>{user.name}</h1>
              <svg
                height="20"
                viewBox="0 0 512 512"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z"
                  fill="#1da1f2"
                />
              </svg>
            </div>
            <p>@{user.username}</p>
          </div>
        </div>
        <svg
          height="100%"
          className="twitter-logo-2"
          style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinejoin: "round",
            strokeMiterlimit: 2,
          }}
          version="1.1"
          viewBox="0 0 512 512"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            height="400"
            style={{ fill: "none" }}
            width="400"
            x="56"
            y="56"
          />
          <path
            d="M161.014,464.013c193.208,0 298.885,-160.071 298.885,-298.885c0,-4.546 0,-9.072 -0.307,-13.578c20.558,-14.871 38.305,-33.282 52.408,-54.374c-19.171,8.495 -39.51,14.065 -60.334,16.527c21.924,-13.124 38.343,-33.782 46.182,-58.102c-20.619,12.235 -43.18,20.859 -66.703,25.498c-19.862,-21.121 -47.602,-33.112 -76.593,-33.112c-57.682,0 -105.145,47.464 -105.145,105.144c0,8.002 0.914,15.979 2.722,23.773c-84.418,-4.231 -163.18,-44.161 -216.494,-109.752c-27.724,47.726 -13.379,109.576 32.522,140.226c-16.715,-0.495 -33.071,-5.005 -47.677,-13.148l0,1.331c0.014,49.814 35.447,93.111 84.275,102.974c-15.464,4.217 -31.693,4.833 -47.431,1.802c13.727,42.685 53.311,72.108 98.14,72.95c-37.19,29.227 -83.157,45.103 -130.458,45.056c-8.358,-0.016 -16.708,-0.522 -25.006,-1.516c48.034,30.825 103.94,47.18 161.014,47.104"
            style={{ fill: "#1da1f2", fillRule: "nonzero" }}
          />
        </svg>
      </div>
      <div className="card-body">
        <div className="card-description-container">
          <p>{description}</p>
        </div>
        <div className="link-preview-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="500"
            height="600"
            viewBox="0 0 406.065 406.067"
          >
            <path
              d="M0 72.883v260.304c0 40.172 32.708 72.881 72.888 72.881H333.18c40.179 0 72.885-32.709 72.885-72.881V72.883C406.064 32.709 373.358 0 333.18 0H72.887C32.708 0 0 32.709 0 72.883z"
              fill="#6ebedf"
            />
            <path
              d="M.015 137.778c56.04 17.901 126.999 28.597 204.196 28.597 76.094 0 146.162-10.396 201.839-27.85V71.27c-.587-35.795-27.114-65.416-61.567-70.8-2.618-.3-5.275-.47-7.973-.47H68.783c-1.8 0-3.578.091-5.345.226C27.715 4.885.015 35.508.015 72.474v65.304z"
              fill="#81c7e8"
            />
            <path
              d="M22.969 83.728c0-33.553 27.208-60.845 60.847-60.845h238.433c33.641 0 60.848 27.292 60.848 60.845v238.521c0 33.643-27.207 60.852-60.848 60.852H83.816c-33.639 0-60.847-27.209-60.847-60.852V83.728zM9.322 78.86v248.345c0 38.336 31.206 69.541 69.54 69.541h248.341c38.335 0 69.539-31.205 69.539-69.541V78.86c0-38.332-31.204-69.538-69.539-69.538H78.862c-38.334 0-69.54 31.206-69.54 69.538z"
              opacity=".5"
              fill="#fff"
            />
            <path
              d="M197.464 172.475c10.352-32.311 23.004-53.25 37.561-68.429 10.863-11.329 16.468-14.924 10.093-2.452 2.816-2.257 6.87-5.26 10.013-6.864 17.615-8.311 16.366-1.344 4.229 6.124 33.122-11.85 31.974 3.24-3.059 10.756 28.644.54 59.095 18.767 67.858 57.537 1.212 5.366-.239 4.856 5.256 5.828 11.863 2.1 23.023 1.971 33.904-1.485-1.178 8.021-11.772 13.233-28.301 16.676-6.124 1.275-7.38.94-.039 2.591 9.037 2.033 19.15 2.559 29.84 2.058-8.328 9.585-21.6 14.486-38.019 14.687-10.269 37.498-33.732 64.35-63.43 81.204-69.728 39.577-171.229 33.834-222.127-38.092 33.398 26.208 82.877 31.981 119.625-4.548-24.073.005-30.307-18.023-11.222-27.762-18.074-.185-29.563-5.901-36.306-16.254-2.561-3.93-2.587-4.232 1.588-7.249 4.593-3.319 10.849-4.795 17.312-5.292-18.705-5.354-30.144-15.129-34.104-28.235-1.311-4.335-1.515-4.115 2.897-5.235 4.312-1.094 9.863-1.678 14.84-1.923-14.691-8.912-23.471-19.833-25.706-31.908-2.108-11.396.062-8.472 8.598-5.207 38.149 14.596 76.181 30.269 98.699 53.474z"
              fill="#fff"
            />
          </svg>
          <div className="link-preview">
            <h2>{title}</h2>
            <p>{subtitle}</p>
            <a href={url.target} target="_blank">
              {url.label}
            </a>
          </div>
        </div>
        <div className="card-details-container">
          <div className="card-details">
            <div className="hearts-count">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>{numOfHearts}</p>
            </div>
            <p>{dateCreated}</p>
          </div>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="#1C274C" strokeWidth="1.5" />
            <path
              d="M12 17V11"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle
              cx="1"
              cy="1"
              r="1"
              transform="matrix(1 0 0 -1 11 9)"
              fill="#1C274C"
            />
          </svg>
        </div>
      </div>
      <div className="card-comments-container">
        <a href={commentUrl}>
          <div className="card-comments">
            <div className="comments-count">
              <svg
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <title>comment-1</title>
                <desc>Created with Sketch Beta.</desc>
                <defs></defs>
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Icon-Set"
                    transform="translate(-100.000000, -255.000000)"
                    fill="#000000"
                  >
                    <path
                      d="M116,281 C114.832,281 113.704,280.864 112.62,280.633 L107.912,283.463 L107.975,278.824 C104.366,276.654 102,273.066 102,269 C102,262.373 108.268,257 116,257 C123.732,257 130,262.373 130,269 C130,275.628 123.732,281 116,281 L116,281 Z M116,255 C107.164,255 100,261.269 100,269 C100,273.419 102.345,277.354 106,279.919 L106,287 L113.009,282.747 C113.979,282.907 114.977,283 116,283 C124.836,283 132,276.732 132,269 C132,261.269 124.836,255 116,255 L116,255 Z"
                      id="comment-1"
                    ></path>
                  </g>
                </g>
              </svg>
              <p>{numOfComments}</p>
            </div>
            <p>people are talking about this</p>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
              fill="#000000"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}


