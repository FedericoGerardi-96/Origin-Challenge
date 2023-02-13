import Head from "next/head";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className={"bg-purple"}>
      <Head>
        <title>404 Page - Lost In Space</title>

        <meta name="description" content="404 Page - Lost In Space" />

        <meta name="og:title" content="404 Page - Lost In Space" />

        <meta name="og:description" content="404 Page - Lost In Space" />
      </Head>
      <div className="stars">

        <div className="central-body">
          <img className="image-404" src="http://salehriaz.com/404Page/img/404.svg" width="300px" />
          <Link href="/" className="btn-go-home">
            GO BACK HOME
          </Link>
        </div>
        <div className="objects">
          <img className="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px" />
          <div className="earth-moon">
            <img className="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px" />
            <img className="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px" />
          </div>
          <div className="box_astronaut">
            <img className="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px" />
          </div>
        </div>
        <div className="glowing_stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
