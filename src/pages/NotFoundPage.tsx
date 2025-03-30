import { Link } from "react-router-dom";

import TextButton from "../components/TextButton";

import PageLayout from "./PageLayout";

export default function NotFoundPage() {
  return (
    <PageLayout>
      <div className="min-h-[40vh] flex flex-col items-center justify-center gap-5">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/">
          <TextButton>
            <img
              src="/triangle_pixel.svg"
              alt="Insert Coin"
              className="mr-[16px]"
            />
            Go to Home
          </TextButton>
        </Link>
      </div>
    </PageLayout>
  );
}
