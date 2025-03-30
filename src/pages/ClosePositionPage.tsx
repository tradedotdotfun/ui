import { useEffect } from "react";

import ClosePosition from "../components/ClosePosition";

import PageLayout from "./PageLayout";

export default function ClosePositionPage() {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <PageLayout>
      <ClosePosition />
    </PageLayout>
  );
}
